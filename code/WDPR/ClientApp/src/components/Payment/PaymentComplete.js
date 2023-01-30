import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import GetEndpoint from '../Admin/EndPointUtil';
import KaartjesDisplay from '../KaartjesDisplay';
import Kaartje from '../GebruikersPortaal/Kaartje';
import Navigatie from '../navFoot/navbar';
import Footer from '../navFoot/Footer';

export default class PaymentComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bestellingen: [],
            kaartjes: []
        }
    }

    getBetaalCode = event => {
        const queryParameters = new URLSearchParams(window.location.search)
        const zaalId = queryParameters.get("id")

        return (zaalId);
    }

    componentDidMount = async () => {
        let gebruikersNaam = sessionStorage.getItem('gebruikersNaam');
        let bezId;
        if (!gebruikersNaam) {
            bezId = localStorage.getItem('bezoekerId');
            if (!bezId) {
                bezId = uuidv4();
                localStorage.setItem('bezoekerId', bezId);
            }
        }

        let endpoint = GetEndpoint() + 'Bestelling/getBestellingFromCode/' + this.getBetaalCode();
        let result;
        try {
            result = await axios.get(endpoint);
            this.setState({ bestellingen: result.data });
        } catch (err) {
            console.error(err);
        }

        endpoint = GetEndpoint() + 'Kaartje/kaartjesFromBestellingen';
        try {
            const result2 = await axios.post(endpoint, result.data);
            this.setState({ kaartjes: result2.data });
        } catch (err) {
            console.error(err);
        }

        endpoint = GetEndpoint() + 'Bestelling/voltooid';
        const codeWrapper = {
            code: this.getBetaalCode()
        }
        try {
            const result3 = await axios.post(endpoint, codeWrapper);
            console.log(result3.data);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const kaartjes = this.state.kaartjes.map(k =>
            <Kaartje key={k.code} kaartje={k} />
        );
        return (
            <div>
                <Navigatie/>
                <h1>
                    Bestelling voltooid
                </h1>
                <p>Bedankt voor het betalen ;)</p>
                {kaartjes}
                <Footer/>
            </div>
        );
    }
}