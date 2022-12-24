import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Voorstelling from "./components/Voorstelling";
import './custom.css';
import Tickets from "./components/Tickets"
import Homepage from './components/Homepage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/Voorstelling' element={<Voorstelling />}></Route>
        <Route path='/Tickets' element={<Tickets />}></Route>
      </Routes>
    </>
  );
}