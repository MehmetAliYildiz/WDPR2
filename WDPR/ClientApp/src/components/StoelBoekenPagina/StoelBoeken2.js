import './StoelBoeken.css';
import { useState, useEffect, Component } from 'react';
import React from 'react';
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import axios from 'axios';

export default class StoelBoeken extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stoelen: [],
            geselecteerd: null,
            connection: React.createRef()
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
            .withUrl("https://localhost:7260/myhub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        this.state.connection.current.start().then(() => {
            console.log("Connected!");
        });

        axios.get('https://localhost:7260/Stoel/' + this.getZaalId() + '/' + this.getAgendaId())
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
                return "white";
            case "Geselecteerd":
                return "green";
            case "Bezet":
                return "grey";
            default:
                return "red";
        }
    }

    toggleStatus = (id) => {
        this.state.stoelen[id].status = this.state.stoelen[id].status == "Vrij" ? "Geselecteerd" : "Vrij";
        this.setState({ stoelen: this.state.stoelen });
    }

    handleSubmit = () => {
        const geselecteerdeStoelen = [];
        for (let index = 0; index < this.state.stoelen.length; index++) {
            if (this.state.stoelen[index].status !== "Geselecteerd") continue;
            geselecteerdeStoelen.push(this.state.stoelen[index].id);
        }

        const endpoint = 'https://localhost:7260/Kaartje';
        const data = {
            agendaId: this.getAgendaId(),
            stoelIds: geselecteerdeStoelen
        };
        try {
            axios.post(endpoint, data);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
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
                    <button key={"stoel-" + this.state.stoelen[stoelIndex].id} disabled={this.state.stoelen[stoelIndex].status == "Bezet"} style={{ backgroundColor: this.getColor(stoelIndex) }} onClick={() => this.toggleStatus(stoelIndex)}>
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
            <div>
                {rowDivs}

                <button type="button" onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}