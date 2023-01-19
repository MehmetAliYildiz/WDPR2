import { useState, useEffect } from "react";
import Axios from "axios";
import Navigatie from "../navFoot/navbar";
import Footer from "../navFoot/Footer";

function VoorstellingDetail(prop) {
    
    const [voorstelling, setVoorstelling] = useState([]);
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const voorstellingId = queryParameters.get("itemId");
        
        Axios.get(`https://localhost:7260/api/Voorstelling/${voorstellingId}`).then((res) => {
            setVoorstelling(res.data);
            console.log(res.data);
        });

        Axios.get(`https://localhost:7260/api/agenda/voorstelling/${voorstellingId}`)
        .then((res) => {
            // setAgendas([
            //     { id: 1, title: 'Meeting with team' },
            //     { id: 2, title: 'Lunch with client' },
            //     { id: 3, title: 'Prepare for presentation' },
            // ]);
            console.log(res.data);
            for(var i = 0; i < res.data.lenght; i++){
                agendas.push(res.data[i]);
            }

            // setAgendas(res.data);
            // console.log(res.data);
            console.log(agendas)
        });

    }, []);
        
    return (
    <>
        < Navigatie />
        <div>
            <h1>{voorstelling.name}</h1>
            <img src={voorstelling.img} alt="..." />
            <p>{voorstelling.beschrijving}</p>
            <p>{voorstelling.ZaalId}</p>

            {agendas.map((agenda) => (
    <div key={agenda.Id}>
        <p>{agenda.StartDatumTijd}</p>
        <p>{agenda.EindDatumTijd}</p>
        <p>{agenda.ZaalId}</p>
    </div>
))}
        </div>
        < Footer />
    </>
        
    );
}
export default VoorstellingDetail;