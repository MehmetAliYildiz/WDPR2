import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Voorstelling from "./components/VoorstellingPagina/Voorstelling";
import './custom.css';
import Tickets from "./components/Tickets"
import Homepage from './components/HomePagina/Homepage';
import Doneer from './components/DonatiePagina/Doneer';
import Inloggen from './components/Login/Login';
import Reserveren from './components/Reserveren';
import Registratie from './components/Registration/Registratie';
import ZaalLijst from './components/ZaalLijst';
import ReserveerForm from './components/ReserveerForm';
import StoelBoekenTest from './components/StoelBoekenPagina/StoelBoekenTest';
import ShoppingCart from './components/ShoppingCart';
import AdminLogin from './components/Admin/adminLogin';
import DoneerOphalen from './components/DonatiePagina/DoneerOphalen';
 
<><link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous" /><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script></>

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/Voorstelling' element={<Voorstelling />}></Route>
        <Route path='/Tickets' element={<ZaalLijst />}></Route>
        <Route path='/doneren' element={<Doneer />}></Route>
        <Route path='/inloggen' element={<Inloggen />}></Route>
        <Route path='/reserveren' element={<Reserveren />}></Route>
        <Route path='/registreer' element={<Registratie />}></Route>
        <Route path='/reserveren/zaal' element={<ReserveerForm />}></Route>
        <Route path='/stoelboeken' element={<StoelBoekenTest />}></Route>
        <Route path='/winkelmandje' element={<ShoppingCart />}></Route>
        <Route path='/adminInlog' element={<AdminLogin />}></Route>
        <Route path='/doneerOphalen' element={<DoneerOphalen />}></Route>
      </Routes>
    </>
  );
}

