import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DonatiePlaatsen = () => {
    const [hoeveelheid, setHoeveelheid] = useState('');
    const [tekst, setTekst] = useState('');
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTc4MDcwYy1kYjk2LTQ2ZmItOWE4MC01MWM3ZjIwY2MzNTQiLCJqdGkiOiIxYzZjNzIwMS1lNmU0LTQ0MzItODRmNS0yMWFhZTllY2U5MGUiLCJpYXQiOiIwMS8yMi8yMDIzIDEwOjQxOjQ5IiwiVXNlcklkIjoiN2U3ODA3MGMtZGI5Ni00NmZiLTlhODAtNTFjN2YyMGNjMzU0IiwiRW1haWwiOiJ2b2xlZ2E5NTU1QHRpbmduLmNvbSIsImV4cCI6MTk5MDAwMzMwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.mapxr6gQjgLHq161mVw1B69fV4orZgK-1lsd57AFBm8';
    const doel = 62;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Doel: doel,
                    Hoeveelheid: hoeveelheid,
                    Tekst: tekst
                })
            });
            const data = await response.json();
            console.log(data);
            alert('Donatie is verstuurt');
        } catch (error) {
            console.log(error);
            alert('Error making donation. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Hoeveelheid:</label>
                <input type="number" className="form-control" value={hoeveelheid} onChange={e => setHoeveelheid(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Tekst:</label>
                <input type="text" className="form-control" value={tekst} onChange={e => setTekst(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default DonatiePlaatsen;