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

    const getNaam = () => {
        return kaartje.bestelling.gebruiker == null ? ("") :
            (<div>naam: {kaartje.bestelling.gebruiker.userName}</div>);
    }

    const addToCalendar = () => {
        const start = new Date(kaartje.agenda.startDatumTijd).toISOString();
        const eind = new Date(kaartje.agenda.eindDatumTijd).toISOString();
        const event = 
        `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART:${start}
DTEND:${eind}
LOCATION:Theater Laak
SUMMARY:Voorstelling
END:VEVENT
END:VCALENDAR`;

        const data = encodeURIComponent(event);
        window.location = "data:text/calendar;charset=utf8," + data;
    };

    return (
        <div>
            <div className="card text-center" key={kaartje.Id}>
                <div id='ticket' className={" ticket ${printen ? 'print-ticket' : ''}"} >
                    <QRCode value={kaartje.code} />
                    <div className="card-body">
                        {getNaam()}
                        <div>start tijd: {new Date(kaartje.agenda.startDatumTijd).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                        <div>eind tijd: {new Date(kaartje.agenda.eindDatumTijd).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                        <div>kaartje code: {kaartje.code}</div>
                    </div>
                </div>
                <button className="btn btn-primary mb-2" onClick={handlePrint}>Print</button>
                <button className="btn btn-primary mb-2" onClick={addToCalendar}>Agenda</button>
            </div>
        </div>
    );
}

export default Kaartje;