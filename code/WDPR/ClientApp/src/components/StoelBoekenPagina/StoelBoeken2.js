import './StoelBoeken.css';
import { useState, useEffect, Component } from 'react';
import React from 'react';
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import GetEndpoint from '../Admin/EndPointUtil';
import Navigatie from '../navFoot/navbar';
import Footer from '../navFoot/Footer';

// Afbeeldingen
import stoelWit from '../../assets/stoelboeken/stoel_wit.png';
import stoelZwart from '../../assets/stoelboeken/stoel_zwart.png';
import stoelRood from '../../assets/stoelboeken/stoel_rood.png';
import stoelGoud from '../../assets/stoelboeken/stoel_goud.png';
import { Navigate } from 'react-router-dom';
import { addToCart } from '../Payment/ShoppingCartUtil';

export default class StoelBoeken extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stoelen: [],
            geselecteerd: null,
            maxBereikt: false,
            connection: React.createRef(),
            redirectLink: null
        }
    }

    getZaalId = event => {
        const queryParameters = new URLSearchParams(window.location.search)
        const zaalId = queryParameters.get("zaalId")

        return (zaalId);
    }

    getAgendaId = event => {
        const queryParameters = new URLSearchParams(window.location.search)
        const agendaId = queryParameters.get("agendaId")

        return (agendaId);
    }

    componentDidMount() {
        this.state.connection.current = new HubConnectionBuilder()
            .withUrl(GetEndpoint()+ "myhub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        this.state.connection.current.start().then(() => {
            console.log("Connected!");
        });

        axios.get(GetEndpoint() + 'Stoel/' + this.getZaalId() + '/' + this.getAgendaId())
            .then(response => {
                this.setState({
                    stoelen: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });

        this.state.connection.current.on("ReceiveData", (newData) => {
            const data = JSON.parse(newData);
            for (let i = 0; i < this.state.stoelen.length; i++) {
                if (this.state.stoelen[i].id == data.stoelId) {
                    this.state.stoelen[i].status = data.status;
                    console.log("status van " + i + " geupdate");
                    this.setState({
                        stoelen: this.state.stoelen
                    });
                    break;
                }
            }
        });
    }

    componentWillUnmount() {
        this.state.connection.current.stop();
    }

    toggleStatus = (id) => {
        if (this.state.maxBereikt && this.state.stoelen[id].status == "Vrij") return;
        this.state.stoelen[id].status = this.state.stoelen[id].status == "Vrij" ? "Geselecteerd" : "Vrij";
        this.setState({ stoelen: this.state.stoelen });

        let geselecteerdeCount = 0;
        for (let i = 0; i < this.state.stoelen.length; i++) {
            if (this.state.stoelen[i].status == "Geselecteerd") geselecteerdeCount++;
        }

        this.setState({ maxBereikt: geselecteerdeCount >= 25 });
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

        const geselecteerdeStoelen = [];

        for (let index = 0; index < this.state.stoelen.length; index++) {
            if (this.state.stoelen[index].status !== "Geselecteerd") continue;
            geselecteerdeStoelen.push(this.state.stoelen[index].id);
        }

        let endpoint = GetEndpoint() + 'Kaartje/' + (gebruikersNaam ? 'gebruiker' : 'bezoeker');
        let kaartje;
        const data = {
            agendaId: this.getAgendaId(),
            stoelIds: geselecteerdeStoelen,
            gebruikerEmail: gebruikersNaam,
            bezoekerId: bezId,
            code: ""
        };
        try {
            kaartje = (await axios.post(endpoint, data)).data;
        } catch (err) {
            console.error(err);
        }

        console.log(kaartje);
        addToCart("kaartje-" + kaartje.id, kaartje.bestelling.bedrag, kaartje);

        this.setState({ redirectLink: "/winkelmandje" });
    }

    getImage(rang, status) {
        if (status == "Geselecteerd") return stoelWit;
        switch (rang) {
            case 1:
                return stoelGoud;
            case 2:
                return stoelRood;
            case 3:
                return stoelZwart;
            default:
                return stoelZwart;
        }
    }

    getColor(rang, status) {
        if (status !== "Geselecteerd") return "#FFFFFF";
        switch (rang) {
            case 1:
                return "#F39A05";
            case 2:
                return "#8B0001";
            case 3:
                return "#000000";
            default:
                return "#000000";
        }
    }

    render() {
        if (this.state.redirectLink !== null) {
            window.location.href = this.state.redirectLink;
            return ("");
        }
        const rows = [];
        let j = null;
        for (let i = 0; i < this.state.stoelen.length; i++) {
            if (this.state.stoelen[i].row != j) {
                j = this.state.stoelen[i].row;
                rows.push(j);
            }
        }

        const rowDivs = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const stoelen = [];

            for (let stoelIndex = 0; stoelIndex < this.state.stoelen.length; stoelIndex++) {
                if (this.state.stoelen[stoelIndex].row != rows[rowIndex]) continue;

                const rang = this.state.stoelen[stoelIndex].rang;
                stoelen.push(
                    <button
                        className="stoel-knop"
                        key={"stoel-" + this.state.stoelen[stoelIndex].id}
                        disabled={this.state.stoelen[stoelIndex].status == "Bezet" || (this.state.stoelen[stoelIndex].status === "Vrij" && this.state.maxBereikt)}
                        style={{ backgroundColor: this.getColor(rang, this.state.stoelen[stoelIndex].status) }}
                        onClick={() => this.toggleStatus(stoelIndex)}
                    >
                        <img src={this.getImage(rang, this.state.stoelen[stoelIndex].status)} width="36px" height="36px"/>
                    </button>
                );
            }

            rowDivs.push(
                <div key={"row-" + rows[rowIndex]}>
                    {stoelen}
                </div>
            );
        }

        return this.state.redirectLink !== null ? (<Navigate to={this.state.redirectLink}/>) : (
            <div>
                <Navigatie/>
                <div className="main">
                    <div className="stoel-menu">
                        <section className="stoel-select">
                            <div className="podium">
                                Podium
                            </div>
                            {rowDivs}
                        </section>
                        <aside className="legenda">
                            <div className="legenda-row">
                                <button className="legenda-item" style={{ backgroundColor: this.getColor(1, "Geselecteerd") }} />
                                <p style={{ padding: "5px 0px 0px 0px" }}>
                                    Eersterangsstoel
                                </p>
                            </div>
                            <div className="legenda-row">
                                <button className="legenda-item" style={{ backgroundColor: this.getColor(2, "Geselecteerd") }} />
                                <p style={{ padding: "5px 0px 0px 0px" }}>
                                    Tweederangsstoel
                                </p>
                            </div>
                            <div className="legenda-row">
                                <button className="legenda-item" style={{ backgroundColor: this.getColor(3, "Geselecteerd") }} />
                                <p style={{ padding: "5px 0px 0px 0px" }}>
                                    Derderangsstoel
                                </p>
                            </div>
                        </aside>
                    </div>

                    <button type="button" className="boek-knop" onClick={this.handleSubmit}>
                        Boek Nu
                    </button>
                </div>
                <Footer/>
            </div>
        );
    }
}