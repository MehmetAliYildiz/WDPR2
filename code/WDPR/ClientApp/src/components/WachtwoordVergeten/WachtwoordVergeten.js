import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const loginKnop = {
        backgroundColor: '#8B0001',
        borderRadius: '10px',
        width: '100%',
        border: '0px'
    }


    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [herhaalWachtwoord, setHerhaalWachtwoord] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (wachtwoord !== herhaalWachtwoord) {
            setError('Nieuw wachtwoord en bevestiging van het nieuwe wachtwoord komen niet overeen.');
            return;
        }

        try {
            const response = await fetch('http://groep3theaterlaak.switzerlandnorth.cloudapp.azure.com/api/Account/wachtwoordWijzigen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, wachtwoord, herhaalWachtwoord }),
            });

            if (!response.ok) {
                console.log(response.text)
                throw new Error(await response.text());
            }
            console.log(response.text)

            // Handle successful password reset
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center
            min-vh-100 g-0">
            <div className="col-12 col-md-8 col-lg-4">
            <div className="card shadow-sm">
                <div className="card-body">
                <div className="mb-4">
                    <h2>Wachtwoord vergeten?</h2>
                    <p className="mb-2">Dat kan gebeuren, voer je email in om je wachtwoord te herstellen</p>
                </div>
                <form>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" name="email" value={email} placeholder="email@test.com" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="wachtwoord" className="form-label">wachtwoord</label>
                    <input type="password" id="wachtwoord" className="form-control" name="wachtwoord" value={wachtwoord} placeholder="*******" onChange={(e) => setWachtwoord(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="herhaalWachtwoord" className="form-label">herhaalWachtwoord</label>
                    <input type="password" id="herhaalWachtwoord" className="form-control" name="herhaalWachtwoord" value={herhaalWachtwoord} placeholder="*******" onChange={(e) => setHerhaalWachtwoord(e.target.value)} required/>
                    </div>
                    <div className="mb-3 d-grid">
                    <button type="submit" className="btn btn-primary" style={loginKnop}>Herstel wachtwoord</button>
                    </div>
                    <span>terug naar login? <a href="/inloggen" style={{color: '#F39A05'}}>inloggen</a></span>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Login;