import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'react-qr-code';

function QrCode({ kaartjes }) {
  const [print, setPrint] = useState(false);

  const handlePrint = () => {
    setPrint(true);
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
      
      {kaartjes.map(kaartje => (
        <div className="card" key={kaartje.Id}>
            <div className={"ticket ${printen ? 'print-ticket' : ''}"} >
                <QRCode value={kaartje.code}/>
                <div className="card-body text-center">
                    <div>id: {kaartje.bestelling.gebruiker.userName}</div>
                    <div>start tijd: {kaartje.agenda.startDatumTijd}</div>
                    <div>eind tijd: {kaartje.agenda.eindDatumTijd}</div>
                    <div>kaartje code: {kaartje.code}</div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handlePrint}>Print</button>
        </div>
      ))}
    </div>
  );
}

export default QrCode;