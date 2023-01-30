import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";
import GetEndpoint from '../Admin/EndPointUtil';

const ArtiestPost = () => {
    const [artiesten, setArtiesten] = useState([]);
    const [gebruikersnaam, setGebruikersnaam] = useState('');
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(GetEndpoint()+'api/artiest')
            .then(response => setArtiesten(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        const artiestDTO = {
            gebruikersnaam: gebruikersnaam,
            Email: email,
            Wachtwoord: wachtwoord
        };
        axios.post(GetEndpoint()+'api/artiest', artiestDTO)
            .then(response => {
                setArtiesten([...artiesten, response.data]);
                setMessage('Artiest created successfully');
                setError('');
            })
            .catch(error => {
                setError('Error creating artiest: ' + error.message);
                setMessage('');
            });
    }

    return (
        <div>
            <NavBar/>
            <h2>Artiesten Beheren</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Gebruikersnaam:
                    <input className="form-control" type="text" value={gebruikersnaam} onChange={e => setGebruikersnaam(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input className="form-control" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Wachtwoord:
                    <input className="form-control" type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} />
                </label>
                <br />
                <button type="submit">Aanmaken</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <h1 className={"title"}>Artiesten Tabel</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {artiesten.map((artiest) => (
                    <tr key={artiest.Id}>
                        <td>{artiest.id}</td>
                        <td>{artiest.userName}</td>
                        <td>{artiest.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}

export default ArtiestPost;
