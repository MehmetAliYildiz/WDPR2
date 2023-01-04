import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Voorstelling from "./components/Voorstelling";
import './custom.css';
import Tickets from "./components/Tickets"
import Homepage from './components/Homepage';
import Doneer from './components/Doneer';
import Inloggen from './components/Inloggen';
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
        <Route path='/Tickets' element={<Tickets />}></Route>
        <Route path='/doneren' element={<Doneer />}></Route>
        <Route path='/inloggen' element={<Inloggen />}></Route>
      </Routes>
    </>
  );
}

