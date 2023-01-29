import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Voorstelling from "./components/VoorstellingPagina/Voorstelling";
import './custom.css';
import Homepage from './components/HomePagina/Homepage';
import Doneer from './components/DonatiePagina/DoneerOphalen';
import Inloggen from './components/Login/Login';
import Reserveren from './components/Reserveren';
import Registratie from './components/Registration/Registratie';
import ZaalLijst from './components/ZaalLijst';
import ReserveerForm from './components/ReserveerForm';
import ShoppingCart from './components/ShoppingCart';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PaymentForm from "./components/FakePayPagina/PaymentForm";
import VoorstellingDetail from './components/VoorstellingPagina/VoorstellingDetail';
import ExcelUploaden from './components/AdminPanel/CSVToevoegen/ExcelUploaden';
import StoelBoeken2 from './components/StoelBoekenPagina/StoelBoeken2';
import SocketTest from './components/SocketTest';
import WachtwoordVergeten from './components/WachtwoordVergeten/WachtwoordVergeten';
import GebruikersPortaal from './components/GebruikersPortaal/GebruikersPortaal';
import PaymentComplete from './components/Payment/PaymentComplete';

import VoorstellingPost from './components/AdminPanel/VoorstellingPost';
import ArtiestPost from './components/AdminPanel/ArtiestPost';
import GebruikerGet from './components/AdminPanel/GebruikerGet';
import BandPost from './components/AdminPanel/BandPost';

import AdminHoofdMenu from './components/AdminPanel/AdminHoofdMenu';
import AdminLogin from './components/Admin/adminLogin';




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
                <Route path='/reserveren/ruimte' element={<ReserveerForm />}></Route>
                <Route path='/winkelmandje' element={<ShoppingCart />}></Route>
                <Route path='/admin/zaalbeheer' element={<AdminPanel />}></Route>
                <Route path='/voorstelling/geselecteerd' element={<VoorstellingDetail />}></Route>
                <Route path='/voorstelling/boekstoel' element={<StoelBoeken2 />}></Route>
                <Route path='/sockettest' element={<SocketTest />}></Route>
                <Route path={'/Admin/Voorstelling'} element={<VoorstellingPost />}></Route>
                <Route path='/admin/exceltoevoegen' element={<ExcelUploaden/>}></Route>
                <Route path={'/pay'} element={<PaymentForm />}></Route>
                <Route path={'/wwVergeten'} element={<WachtwoordVergeten />}></Route>
                <Route path={'/gebruikerportaal'} element={<GebruikersPortaal />}></Route>
                <Route path={'/paymentcomplete'} element={<PaymentComplete />}></Route>

                <Route path={'/Admin/Artiest'} element={<ArtiestPost />}></Route>
                <Route path={'/Admin/Gebruiker'} element={<GebruikerGet />}></Route>
                <Route path={'/Admin/Band'} element={<BandPost />}></Route>

                <Route path={'/admin'} element={<AdminHoofdMenu />}></Route>
                <Route path={'/admin/login'} element={<AdminLogin />}></Route>
            </Routes>
        </>

  );
}
