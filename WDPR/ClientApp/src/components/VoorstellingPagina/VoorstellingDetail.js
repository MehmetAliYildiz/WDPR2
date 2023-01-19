import { useState, useEffect, Component } from "react";
import Axios from "axios";
import Navigatie from "../navFoot/navbar";
import Footer from "../navFoot/Footer";

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
            return (
                <section>
                    <p>{agenda.id}</p>
                    <p>{agenda.startDatumTijd}</p>
                    <p>{agenda.eindDatumTijd}</p>
                </section>
            );
        });
        return (
        <>
            <Navigatie/>
            <div>
                <h1>{this.state.voorstelling.name}</h1>
                <img src={this.state.voorstelling.img} alt="..." />
                <p>{this.state.voorstelling.beschrijving}</p>
                <div>{agendaItems}</div>
            </div>
            <Footer/>
        </>
        
        );
    }
}
export default VoorstellingDetail;