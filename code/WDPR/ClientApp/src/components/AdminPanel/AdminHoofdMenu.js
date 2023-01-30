import React from "react";
import { Link } from 'react-router-dom';
import './AdminHoofdmenu.css'

export default function AdminHoofdMenu() {
    return (
        <div className="admin-menu-container">
            <h1>Welkom op de adminpagina!</h1>
            <div className="admin-menu-buttons">
                <Link to="/admin/exceltoevoegen">
                    <button className="admin-menu-button">Programma Invoeren</button>
                </Link>
                <Link to="/admin/zaalbeheer">
                    <button className="admin-menu-button">Zaalbeheer</button>
                </Link>
                <Link to="/admin/login">
                    <button className="admin-menu-button">Login</button>
                </Link>
            </div>
        </div>
    )
}
