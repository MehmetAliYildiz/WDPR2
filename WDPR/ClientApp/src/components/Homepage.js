import React from "react";
import Logo from "../../src/HomeImages/Logo_theater_laak_V2.png";
import Donate_icoon from "../../src/HomeImages/Donate_icoon.png";
import Login_icoon from "../../src/HomeImages/Login_icoon.png";
import Tickets_icoon from "../../src/HomeImages/Ticket_Icoon.png";

// import Link from "react-router-dom";
import "./HomePage.css";

export default function Homepage() {
    return (
        <>
            <body>
                <section className="Section1">
                    <div>
                        <h1>HET LEUKSTE THEATER VAN DEN HAAG</h1>
                    </div>
                    <div className="LogoDiv">
                        <img className="Logo" src={Logo} alt="Logo"></img>
                    </div>
                </section>
                <section className="Section2">
                    <div>
                        <h2>Doneren</h2>
                        <img class="Icoon" src={Donate_icoon} alt="Doneer"></img>
                        <p>Steun Theater Laak om onze voorstellingen betaalbaar te houden voor iedereen!</p>
                        <button></button>
                    </div>
                    <div>
                        <h2>Tickets</h2>
                        <img class="Icoon" src={Tickets_icoon} alt="Tickets"></img>
                        <p>Koop hier je tickets voor je favoriete voorstelling bij Theater Laak</p>
                        <button></button>
                    </div>
                    <div>
                        <h2>Doneren</h2>
                        <img class="Icoon" src={Login_icoon} alt="Login"></img>
                        <p>Login bij je account</p>
                        <button></button>
                    </div>
                </section>
            </body>
        </>
    )
}