import { useState, useEffect, Component } from "react";
import Axios from "axios";
import Navigatie from "../navFoot/navbar";
import Footer from "../navFoot/Footer";
import "./VoorstellingDetail.css"

class VoorstellingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voorstelling: [],
            agendas: []
        }
    }

    componentDidMount() {
        const queryParameters = new URLSearchParams(window.location.search);
        const voorstellingId = queryParameters.get("itemId");
        
        Axios.get(`https://localhost:7260/api/Voorstelling/${voorstellingId}`).then((res) => {
            this.setState({ voorstelling: res.data });
        });

        Axios.get(`https://localhost:7260/api/agenda/voorstelling/${voorstellingId}`)
            .then((res) => {
                if (res.data == null) return;
                for (let i = 0; i < res.data.length; i++) {
                    this.state.agendas.push(res.data[i]);
                    this.setState({ agendas: this.state.agendas });
                }
            }
        );

    }

    render() {
        const agendaItems = this.state.agendas.map(agenda => {
            const startDatumTijd = new Date(agenda.startDatumTijd).toLocaleDateString();
            const eindDatumTijd = new Date(agenda.eindDatumTijd).toLocaleDateString();
            return (
                <section>
                    <p>{agenda.id}</p>
                    <p>{startDatumTijd}</p>
                    <p>{eindDatumTijd}</p>
                    <a href={`voorstelling/boekstoel?zaalId=${agenda.zaalId}&agendaId=${agenda.id}`}>Boek nu</a>
                </section>
            );
        });
        return (
        <>
            <Navigatie/>
            <div className="voorstellingInfoWrapper">
                <h1>{this.state.voorstelling.name}</h1>
                <p>Bekijk hier de informatie over {this.state.voorstelling.name} en boek je kaartje op de gewenste dag en tijd</p>
                <img className="voorstellingPlaatje" src={this.state.voorstelling.img} alt="..." />
                <p>{this.state.voorstelling.beschrijving}</p>
                <p>Hieronder staan alle mogelijke opties om {this.state.voorstelling.name} te bezoeken:</p>
                <div className="agendaItem">{agendaItems}</div>
            </div>
            <Footer/>
        </>
        
        );
    }
}
export default VoorstellingDetail;