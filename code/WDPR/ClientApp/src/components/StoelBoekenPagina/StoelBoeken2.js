import './StoelBoeken.css';
import { useState, useEffect, Component } from 'react';
import React from 'react';
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import axios from 'axios';
import shortid from 'shortid';
import jwt_decode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import GetEndpoint from '../Admin/EndPointUtil';

export default class StoelBoeken extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stoelen: [],
            geselecteerd: null,
            maxBereikt: false,
            connection: React.createRef(),
            tempId: "",
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
            .withUrl(GetEndpoint()+"/myhub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        this.state.connection.current.start().then(() => {
            console.log("Connected!");
        });

        axios.get(GetEndpoint() + this.getZaalId() + '/' + this.getAgendaId())
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

    getColor = (id) => {
        switch (this.state.stoelen[id].status) {
            case "Vrij":
                return this.state.maxBereikt ? "grey" : "white";
            case "Geselecteerd":
                return "green";
            case "Bezet":
                return "grey";
            default:
                return "red";
        }
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
        const kaartjesCode = this.generateKaartjesCode();
        this.setState({ tempId: kaartjesCode });

        for (let index = 0; index < this.state.stoelen.length; index++) {
            if (this.state.stoelen[index].status !== "Geselecteerd") continue;
            geselecteerdeStoelen.push(this.state.stoelen[index].id);
        }

        let endpoint = GetEndpoint() + (gebruikersNaam ? '/gebruiker' : '/bezoeker');
        const data = {
            agendaId: this.getAgendaId(),
            stoelIds: geselecteerdeStoelen,
            code: kaartjesCode,
            gebruikerEmail: gebruikersNaam,
            bezoekerId: bezId
        };
        try {
            await axios.post(endpoint, data);
        } catch (err) {
            console.error(err);
        }

        endpoint = GetEndpoint() + (gebruikersNaam ? 'gebruiker/' : 'bezoeker/') + (gebruikersNaam ? gebruikersNaam : bezId);
        console.log(endpoint);
        try {
            const response = await axios.get(endpoint);
            this.setState({ redirectLink: "http://allyourgoods-transport-webapp-staging.azurewebsites.net/?id=" + response.data.code });
        } catch (err) {
            console.error(err);
        }
    }

    generateKaartjesCode() {
        const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$';
        shortid.characters(alphabet);
        return shortid.generate();
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

                stoelen.push(
                    <button key={"stoel-" + this.state.stoelen[stoelIndex].id} disabled={this.state.stoelen[stoelIndex].status == "Bezet" || (this.state.stoelen[stoelIndex].status === "Vrij" && this.state.maxBereikt)} style={{ backgroundColor: this.getColor(stoelIndex) }} onClick={() => this.toggleStatus(stoelIndex)}>
                        {this.state.stoelen[stoelIndex].id}
                    </button>
                );
            }

            rowDivs.push(
                <div key={"row-" + rows[rowIndex]}>
                    {stoelen}
                </div>
            );
        }

        return (
            <div className="stoel-select">
                {rowDivs}

                <button type="button" onClick={this.handleSubmit}>
                    Submit
                </button>
                {this.state.tempId}
            </div>
        );
    }
}