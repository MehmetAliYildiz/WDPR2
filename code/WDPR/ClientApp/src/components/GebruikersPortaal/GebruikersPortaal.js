import React, { useState, useEffect } from "react";
import QrCode from './qrCode';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar"

function GebruikersPortaal() {
    const [kaartjes, setKaartjes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get the email from the user's session
        const email = sessionStorage.getItem("gebruikersNaam");

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
                    console.log('geen data');
                } else {
                    setKaartjes(data);
                    console.log(data);
                }
            })
            .catch(err => setError(err.message));
    }, []);

    return (
        <>
            <NavBar/>
            <div className="container">
                <div className="row">
                <h1 className="text-center my-5">Kaartjes</h1>

                {kaartjes.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <QrCode kaartjes={kaartjes}/>
                    </div>
                ) : (
                    <p className="text-center">Er zijn nog geen kaartjes gekoppeld aan uw account</p>
                )}</div>
            </div>
            <Footer/>
        </>
    );
}

export default GebruikersPortaal;