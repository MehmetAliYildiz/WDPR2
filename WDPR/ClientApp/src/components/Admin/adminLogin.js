import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {MdAdminPanelSettings, MdAddModerator} from 'react-icons/md';

// import axios from "axios";

function AdminLogin() {
    const wwVergeten = {
        color: '#8B0001',
        float: 'right'
    }

    const loginKnop = {
        backgroundColor: '#8B0001',
        borderRadius: '10px',
        width: '100%',
        border: '0px'
    }

    const navigate = useNavigate();
    const [naam, setNaam] =useState("");
    const [wachtwoord, setWachtwoord] =useState("");
    const [message, setMessage] =useState("");
    const [refreshToken, setRefreshToken] = useState('');
    const [checked, setChecked] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const handleChangeNaam = (value) => {
        setNaam(value);
    };
    const handleChangeWachtwoord = (value) => {
        setWachtwoord(value);
    };

    let handleLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://localhost:7260/api/Account/login", {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                mode:"cors",
                body: JSON.stringify({
                    UserName: naam,
                    Password : wachtwoord,
                }),
            });

            const json = await res.json();

            if (res.ok) {
                // setNaam("");
                // setWachtwoord("")
                const { accessToken, refreshToken } = json;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setMessage("gebruiker is ingelogd");
                localStorage.setItem('gebruikersNaam', naam);

                if(checked){
                    localStorage.setItem('adminRefreshToken', refreshToken);
                } else{
                    localStorage.removeItem('adminRefreshToken');
                }
                
                navigate('/adminpaneel');
            
            }else {
                setMessage("error " + res.status);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
  useEffect(() => {
    // Check for stored refresh token on mount
    const storedRefreshToken = localStorage.getItem('adminRefreshToken');
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
      console.log('refreshtoken zit in localStorage')
      navigate('/');

      setChecked(true);
    } else{
        console.log('geen refreshtoken in localStorage')
    }
  }, []);

    const handleChange = () => {
      setChecked(!checked);
    };
    return (
        <section>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card rounded-3" style={{padding: '0px'}} >
                <div className="row g-0">
                    
                    <div className="col-lg-6 d-flex  justify-content-md-center" style={{backgroundColor: '#8B0001 '}}>
                    <img src={"img/Logo_theater_laak_V2 (1).png"}
                    style={{width: '400px'}} alt="Theater Laak logo"/>
                    </div>

                    <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                        <div className="text-center">
                        <h1>Admin Login</h1>
                        <MdAdminPanelSettings color="#8B0001" size={'185px'}/>

                        </div>

                        <form>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example11">Gebruikersnaam</label>
                            <input type="email" id="form2Example11" className="form-control" placeholder="email adres" onChange={(e) => handleChangeNaam(e.target.value)}/>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example22">Wachtwoord</label>
                            <input type="password" id="form2Example22" className="form-control" placeholder="wachtwoord" onChange={(e) => handleChangeWachtwoord(e.target.value)}/>
                            <label><input type="checkbox" checked={checked} onChange={handleChange}/>Onthoud mij</label>
                            <a style={wwVergeten} href="#!">Wachtwoord vergeten?</a>
                        </div>

                        <div className="text-center pt-1 mb-4 ">
                            <button onClick={handleLogin} className='btn btn-primary' style={loginKnop}type="button">Login</button>
                        </div>

                    

                        <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Nog geen Account?</p>
                            <a href="Registreer"  style={{color: '#F39A05'}}>Registreer nu</a>
                            
                        </div>
                        <div className="message">{message ? <p>{message}</p> : null}</div>

                        </form>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </section>
    );
}

export default AdminLogin;