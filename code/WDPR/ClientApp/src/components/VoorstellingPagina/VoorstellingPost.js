import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";
import "./Voorstelling.css";

function VoorstellingPost() {
    const [voorstelling, setVoorstelling] = useState({
        Name: '',
        beschrijving: '',
        Img: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [voorstellingen, setVoorstellingen] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7260/api/Voorstelling')
            .then(response => {
                setVoorstellingen(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleChange = (event) => {
        setVoorstelling({ ...voorstelling, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://localhost:7260/api/Voorstelling', voorstelling)
            .then(response => {
                console.log(response);
                setVoorstelling({ Name: '', beschrijving: '', Img: '' });
                setVoorstellingen([...voorstellingen, response.data]);
                setMessage('Voorstelling is created successfully.');
                setError('');
            })
            .catch(error => {
                console.log(error);
                setError('Error creating Voorstelling.');
                setMessage('');
            });
    };

    return (
        <div>
            <NavBar/>
            <h1>Voorstelling Toevoegen</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input className="form-control" type="text" name="Name" value={voorstelling.Name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    beschrijving:
                    <input className="form-control" type="text" name="beschrijving" value={voorstelling.beschrijving} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Img:
                    <input className="form-control" type="text" name="Img" value={voorstelling.Img} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
            <h1 className={"title"}>Table Voorstelling</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>beschrijving</th>
                    <th>Img</th>
                </tr>
                </thead>
                <tbody>
                {voorstellingen.map((voorstelling) => (
                    <tr key={voorstelling.Id}>
                        <td>{voorstelling.name}</td>
                        <td>{voorstelling.beschrijving}</td>
                        <td><img className={"img"} src={voorstelling.img} alt={voorstelling.Name}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
}

export default VoorstellingPost;