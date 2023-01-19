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
import AdminPanel from './components/AdminPanel/AdminPanel';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

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
        <Route path='/admin' element={<AdminPanel />}></Route>
      </Routes>
    </>
  );
}

