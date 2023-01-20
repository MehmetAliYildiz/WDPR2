import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import "./Artiest.css";
import Navbar from "../navFoot/navbar";
import Footer from "../navFoot/Footer";
function ArtiestForm() {

    const [naam, setNaam] = useState("");
    const [omschrijving, setOmschrijving] = useState("");
    const [artiestAfbeelding, setArtiestAfbeelding] = useState("");
    const [website, setWebsite] = useState("");

    // const handleChange = (e) => {
    //     setNaam(e.target.value);
    //     setOmschrijving(e.target.value);
    //     setArtiestAfbeelding(e.target.value);
    //     setWebsite(e.target.value)
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            naam: naam,
            omschrijving : omschrijving,
            artiestAfbeelding: artiestAfbeelding,
            website : website
        };
        try {
            const response = await axios.post('https://localhost:7260/api/Artiest', data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar/>
            <h1 className={"h1"} >Artiest Aanmaken</h1>
            <form className={"form"} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Naam</label>
                    <input type="text" className={"form-control"} value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="voer naam in"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Omschrijving</label>
                    <input type="text" className={"form-control"} value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} placeholder="voer een omschrijving in"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Artiest Afbeelding</label>
                    <input type="text" className={"form-control"} value={artiestAfbeelding} onChange={(e) => setArtiestAfbeelding(e.target.value)} placeholder="voer een afbeelding van een artiest in"/>
                </div>
                <div className="form-group">
                    <label >Website Link</label>
                    <input type="text" className={"form-control"} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="voer de website van de artiest in"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Footer/>
        </div>
    );
}
export default ArtiestForm;