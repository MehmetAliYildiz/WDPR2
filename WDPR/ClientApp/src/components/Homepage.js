import React from "react";
import Logo from "../../src/HomeImages/Logo_theater_laak_V2.png";
import Donate_icoon from "../../src/HomeImages/Donate_icoon.png";
import Login_icoon from "../../src/HomeImages/Login_icoon.png";
import Tickets_icoon from "../../src/HomeImages/Ticket_Icoon.png";
import Zaal1 from "../../src/HomeImages/Zaal_1.jpg";
import { Link } from 'react-router-dom';
import ContentKaart from "./ContentKaart";
import Footer from "./navFoot/Footer";
import NavBar from "./navFoot/navbar";
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
                    <ContentKaart header="Tickets" icoon={Tickets_icoon} actie="TICKETS" paragraph="Koop hier je tickets voor je favoriete voorstelling bij Theater Laak" link="/tickets" />
                    <ContentKaart header="Inloggen" icoon={Login_icoon} actie="INLOGGEN" paragraph="Login bij je account" link="/inloggen" />
                </section>
                <section className="Section3">
                    <div>
                        <h2>Over Theater Laak</h2>
                        <p>Theater Laak is een theater in het Haagse Stadsdeel Laak. Met dank aan onze donateurs weten wij al jaren betaalbare theatervoorstellingen te verzorgen voor al onze gasten. Van muziekoptredens tot theatervoorstellingen, alles wordt verzorgd bij Theater Laak. Lijkt het je leuk om een van onze voorstellingen te bezoeken? Neem dan een kijkje bij onze voorstellingen en koop je ticket zolang die beschikbaar is want op is op!</p>
                        <button className="button V2">OVER ONS</button>
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
                                <button className="buttonB">RESERVEER NU</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </body>
            <Footer/>
        </>
    )
}