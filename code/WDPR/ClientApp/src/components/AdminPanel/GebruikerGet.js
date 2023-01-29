import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";

const GebruikerGet = () => {
    const [gebruikers, setGebruikers] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7260/api/gebruiker')
            .then(response => setGebruikers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <NavBar/>
            <h1 className={"title"}>Tabel Gebruikers, Artiesten & Admins</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Gebruikersnaam</th>
                    <th>E-mail</th>
                </tr>
                </thead>
                <tbody>
                {gebruikers.map(gebruiker => (
                    <tr key={gebruiker.Id}>
                        <td>{gebruiker.id}</td>
                        <td>{gebruiker.userName}</td>
                        <td>{gebruiker.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}

export default GebruikerGet;
