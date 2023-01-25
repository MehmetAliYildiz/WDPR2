import React from "react";
import Logo from ".//HomeImages/Logo_theater_laak_V2.png";
import Donate_icoon from "./HomeImages/Donate_icoon.png";
import Login_icoon from "./HomeImages/Login_icoon.png";
import Tickets_icoon from "./HomeImages/Ticket_Icoon.png";
import Zaal1 from "./HomeImages/Zaal_1.jpg";
import { Link } from 'react-router-dom';
import ContentKaart from "./ContentKaart";
import Footer from "./../navFoot/Footer";
import NavBar from "./../navFoot/navbar";
import "./HomePage.css";

export default function Homepage() {
    return (
        <>
            <NavBar></NavBar>
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
                    <ContentKaart header="Doneren" icoon={Donate_icoon} actie="DONEER" paragraph="Steun Theater Laak om onze voorstellingen betaalbaar te houden voor iedereen!" link="/doneren" />
                    <ContentKaart header="Voorstellingen" icoon={Tickets_icoon} actie="VOORSTELLINGEN" paragraph="Bekijk hier de voorstellingen die op dit moment draaien" link="/voorstelling" />
                    <ContentKaart header="Inloggen" icoon={Login_icoon} actie="INLOGGEN" paragraph="Login bij je account" link="/inloggen" />
                </section>
                <section className="Section3">
                    <div>
                        <h2>Over Theater Laak</h2>
                        <p>Theater Laak is een theater in het Haagse Stadsdeel Laak. Met dank aan onze donateurs weten wij al jaren betaalbare theatervoorstellingen te verzorgen voor al onze gasten. Van muziekoptredens tot theatervoorstellingen, alles wordt verzorgd bij Theater Laak. Lijkt het je leuk om een van onze voorstellingen te bezoeken? Neem dan een kijkje bij onze voorstellingen en koop je ticket zolang die beschikbaar is want op is op!</p>
                    </div>
                </section>
                <section className="Section4">
                    <div className="ContentAside">
                        <img src={Zaal1} />
                    </div>
                    <div className="ContentText">
                        <div style={{ width: "300px" }}>
                            <h2>
                                Eigen zaal huren?
                            </h2>
                            <p>
                                Bij theater laak hebben wij een aantal zalen beschikbaar voor gasten.
                            </p>
                            <Link to="/reserveren">
                                <button data-cy="reserveer-knop" className="buttonB">RESERVEER NU</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </body>
            <Footer />
        </>
    )
}