import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'react-qr-code';

function Kaartje(props) {
    const [print, setPrint] = useState(false);
    const [kaartje, setKaartje] = useState(props.kaartje);

  const handlePrint = () => {
    setPrint(true);
    var prinen = document.getElementById("ticket")
    window.print();
    setPrint(false);
  }

  const printen ={
      width: '100%',
      fontSize : '20px',
      padding: '20px'
}

  return (
    <div>
        <div className="card " key={kaartje.Id}>
            <div id='ticket' className={" text-center ticket ${printen ? 'print-ticket' : ''}"} >
                <QRCode value={kaartje.code} />
                <div className="card-body">
                    <div>naam: {kaartje.bestelling.gebruiker.userName}</div>
                    <div>start tijd: {new Date(kaartje.agenda.startDatumTijd).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                    <div>eind tijd: {new Date(kaartje.agenda.eindDatumTijd).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                    <div>kaartje code: {kaartje.code}</div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handlePrint}>Print</button>
            <button className="btn btn-primary" onClick={handlePrint}>Agenda</button>
        </div>
    </div>
  );
}

export default Kaartje;