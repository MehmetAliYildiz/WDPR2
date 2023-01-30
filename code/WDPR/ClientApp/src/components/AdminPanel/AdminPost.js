import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";

const AdminPost = () => {
    const [admins, setAdmins] = useState([]);
    const [gebruikersnaam, setGebruikersnaam] = useState('');
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7260/api/admin')
            .then(response => setAdmins(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        const adminDTO = {
            gebruikersnaam: gebruikersnaam,
            Email: email,
            Wachtwoord: wachtwoord
        };
        axios.post('https://localhost:7260/api/admin', adminDTO)
            .then(response => {
                setAdmins([...admins, response.data]);
                setMessage('Admin created successfully');
                setError('');
            })
            .catch(error => {
                setError('Error creating admin: ' + error.message);
                setMessage('');
            });
    }

    return (
        <div>
            <NavBar/>
            <h2>Create new Admin</h2>
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
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <h1 className={"title"}>Table Admin</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {admins.map((admin) => (

            <tr key={admin.id}>
              <td>{admin.userName}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
};

export default AdminPost;