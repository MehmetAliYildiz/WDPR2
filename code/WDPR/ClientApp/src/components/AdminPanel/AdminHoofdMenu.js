import React from "react";
import { Link } from 'react-router-dom';
import './AdminHoofdmenu.css'
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";

export default function AdminHoofdMenu() {
    return (
        <>
        <NavBar/>
        <div className="admin-menu-container">
            <h1>Welkom op de adminpagina!</h1>
            <div className="admin-menu-buttons">
                <Link to="/admin/exceltoevoegen">
                    <button className="admin-menu-button">Programma Invoeren</button>
                </Link>
                <Link to="/admin/zaalbeheer">
                    <button className="admin-menu-button">Zaalbeheer</button>
                </Link>
                <Link to="/Admin/Artiest">
                    <button className="admin-menu-button">Artiesten</button>
                </Link>
                <Link to="/Admin/band">
                    <button className="admin-menu-button">Bands</button>
                </Link>
                <Link to="/Admin/Gebruiker">
                    <button className="admin-menu-button">Gebruikers ophalen</button>
                </Link>
                <Link to="/Admin/Voorstelling">
                    <button className="admin-menu-button">Voorstelling</button>
                </Link>
                <Link to="/Admin/artiestband">
                    <button className="admin-menu-button">ArtiestBand</button>
                </Link>
                <Link to="/Admin/postadmin">
                    <button className="admin-menu-button">AdminPost</button>
                </Link>
            </div>
        </div>
        <Footer/>
        </>
        
    )
}
