import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js';
import './Navbar.css'

function Navigatie() {
    return (

        <>
        <nav className="navbar navbar-expand-lg site-navigation navKleur">


          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <a className="mb-0" href="/">
                  <img src={"img/Logo_theater_laak_V2 (1).png"} style={{width: "128px", height: '128px'}}  alt="theater laak logo"/>
                </a>
              </div>
              <div className="col-6">
                
              </div>



            </div>
            <button className="navbar-toggler uitklapper" type="button" data-bs-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="navigatie schakelaar">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse col-xl-1 " id={"navbarKlap"}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Voorstelling">Voorstelling</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doneren">Doneren</a>
                </li>
                <li className="nav-item">
                  <a className="btn koop" href="/inloggen">Inloggen</a>
                </li>
              </ul>
              </div>
                
            </div>



          
        </nav>
      </>
    );
}

export default Navigatie;