import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Voorstelling from "./components/Voorstelling";
import './custom.css';
import Tickets from "./components/Tickets"
import Homepage from './components/Homepage';
import Doneer from './components/Doneer';
import Inloggen from './components/Login/Login';
import Registratie from './components/Registration/Registratie'
import ZaalLijst from './components/ZaalLijst';
import Navbar from './components/navFoot/navbar';
import Footer from './components/navFoot/Footer';
import Reserveren from './components/Reserveren';
import ReserveerForm from './components/ReserveerForm';
import ShoppingCart from './components/ShoppingCart';
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
        <Route path='/registreer' element={<Registratie />}></Route>
        <Route path='/nav' element={<Navbar />}></Route>
        <Route path='/footer' element={<Footer />}></Route>
        <Route path='/reserveren' element={<Reserveren />}></Route>
        <Route path='/reserveren/zaal' element={<ReserveerForm />}></Route>
        <Route path='/winkelmandje' element={<ShoppingCart />}></Route>
      </Routes>
    </>
  );
}

