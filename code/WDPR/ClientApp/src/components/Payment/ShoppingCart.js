import React, { Component } from 'react';
import Kaartje from '../GebruikersPortaal/Kaartje';
import { getCart, removeFromCart, getCartTotal } from './ShoppingCartUtil';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import GetEndpoint from '../Admin/EndPointUtil';
import { Navigate } from 'react-router-dom';
import Footer from '../navFoot/Footer';
import Navigatie from '../navFoot/navbar';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: getCart(),
            kaartjes: [],
            bestellingen: [],
            voorstellingen: [],
            stoelKaartjes: [],
            redirectLink: null
        };
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

        let endpoint = GetEndpoint() + 'Bestelling/getBestellingFrom' + (gebruikersNaam ? 'Gebruiker/' : 'Bezoeker/') + (gebruikersNaam ?? bezId);
        console.log(endpoint);
        let result;
        try {
            result = await axios.get(endpoint);
            this.setState({ bestellingen: result.data });
            console.log(result.data);
        } catch (err) {
            console.error(err);
            return;
        }

        endpoint = GetEndpoint() + 'Kaartje/kaartjesFromBestellingen';
        try {
            const result2 = await axios.post(endpoint, result.data);
            this.setState({ kaartjes: result2.data });
        } catch (err) {
            console.error(err);
        }

        endpoint = GetEndpoint() + 'api/Voorstelling';
        let result3;
        try {
            result3 = await axios.get(endpoint);
            this.setState({ voorstellingen: result3.data });
        } catch (err) {
            console.error(err);
        }

        for (let i = 0; i < this.state.kaartjes.length; i++) {
            this.state.kaartjes[i].stoelKaartjes = [];
        }

        endpoint = GetEndpoint() + 'Stoel/getSkFromKaartjes';
        let result4;
        try {
            result4 = await axios.post(endpoint, this.state.kaartjes);
            this.setState({ stoelKaartjes: result4.data });
            console.log(result4.data);
        } catch (err) {
            console.error(err);
        }
    }

    getBestellingDetail(bestelling) {
        if (bestelling.type == "Kaartje") {
            let kaartje;
            for (let i = 0; i < this.state.kaartjes.length; i++) {
                if (this.state.kaartjes[i].bestelling.id == bestelling.id) {
                    kaartje = this.state.kaartjes[i];
                }
            }
            if (kaartje == null) return ("");
            if (kaartje.agenda == null) return ("");

            console.log(kaartje.agenda);
            let voorstelling;
            for (let i = 0; i < this.state.voorstellingen.length; i++) {
                if (this.state.voorstellingen[i].id == kaartje.agenda.voorstellingId) {
                    voorstelling = this.state.voorstellingen[i];
                }
            }
            if (voorstelling == null) return ("");

            let rang = [];
            for (let i = 0; i < this.state.stoelKaartjes.length; i++) {
                if (this.state.stoelKaartjes[i].kaartjeId == kaartje.id) {
                    rang[this.state.stoelKaartjes[i].stoel.rang] = rang[this.state.stoelKaartjes[i].stoel.rang] == null ? 1 : rang[this.state.stoelKaartjes[i].stoel.rang]++;
                }
            }

            const rangInfo = [];
            for (let i = 0; i < rang.length; i++) {
                if (rang[i] == null) continue;
                rangInfo.push(
                    <div>
                        <p>
                            Geboekte rang {i} stoelen: {rang[i]}
                        </p>
                    </div>
                );
            }

            return (
                <div>
                    <h3>
                        {voorstelling.name}
                    </h3>
                    <p>
                        Starttijd: {kaartje.agenda.startDatumTijd}
                    </p>
                    <p>
                        Eindtijd: {kaartje.agenda.eindDatumTijd}
                    </p>
                    {rangInfo}
                </div>
            );
        }
        return ("");
    }

    getBestellingenDOM = () => {
        return (this.state.bestellingen.map(bestelling => {
            return (
                <div key={bestelling.id}>
                    {this.getBestellingDetail(bestelling)}
                </div>
            );
        }));
    }

    handleSubmit = async () => {
        let gebruikersNaam = sessionStorage.getItem('gebruikersNaam');
        let bezId;
        if (!gebruikersNaam) {
            bezId = localStorage.getItem('bezoekerId');
            if (!bezId) {
                bezId = uuidv4();
                localStorage.setItem('bezoekerId', bezId);
            }
        }

        const endpoint = GetEndpoint() + 'Bestelling/payment/' + (gebruikersNaam ? 'gebruiker/' : 'bezoeker/') + (gebruikersNaam ? gebruikersNaam : bezId);
        let response;
        try {
            response = await axios.get(endpoint);
            this.setState({ redirectLink: "http://allyourgoods-transport-webapp-staging.azurewebsites.net/?id=" + response.data.code });
        } catch (err) {
            console.error(err);
        }

        localStorage.removeItem("shoppingCart");
        
        window.location.href = "http://allyourgoods-transport-webapp-staging.azurewebsites.net/?id=" + response.data.code;
    }

    getMain() {
        return this.state.bestellingen.length > 0 ? (
            <div>
                {this.getBestellingenDOM()}
                < button className="boek-knop" type="button" onClick={this.handleSubmit} >
                    Afrekenen
                </button >
            </div>
        ) : (
            <div>
                <p>
                    Uw winkelmandje bevat nog geen bestellingen.
                </p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navigatie />
                <div className="main" style={{ height: "auto" }}>
                    {this.getMain()}
                </div>
                <Footer/>
            </div>
        );
    }
}