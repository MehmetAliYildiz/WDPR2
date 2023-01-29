import React, { useState, useEffect } from "react";
import QrCode from './Kaartje';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar"
import Kaartje from "./Kaartje";
import { Navigate } from "react-router-dom";

function GebruikersPortaal() {
    const [kaartjes, setKaartjes] = useState([]);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        // Get the email from the user's session
        const email = sessionStorage.getItem("gebruikersNaam");

        if (email == null) setRedirect("/inloggen");
        // Fetch the kaartjes when the component mounts
        fetch(`https://localhost:7260/Kaartje/kaartjeBijGebruiker/${email}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setKaartjes(data);
                    console.log(data);
                }
            })
            .catch(err => setError(err.message));
    }, []);

    const getKaartjes = () => {
        return(kaartjes.map(kaartje => {
            return (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <Kaartje kaartje={kaartje} />
                </div>
            );
        }));
    }

    return redirect == "" ? (
        <>
            <NavBar/>
            <div className="container">
                <h1 className="text-center my-5">Kaartjes</h1>
                {error && <p className="text-danger">{error}</p>}
                {kaartjes.length > 0 ? (
                    <div>
                        { getKaartjes() }
                    </div>
                ) : (
                    <p className="text-center">Er zijn nog geen kaartjes gekoppeld aan uw account</p>
                )}
            </div>

            <Footer/>
        </>
    ) : (
            <Navigate to={redirect}/>
    );
}

export default GebruikersPortaal;