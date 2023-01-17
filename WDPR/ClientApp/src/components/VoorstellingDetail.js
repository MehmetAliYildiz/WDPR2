import { useState, useEffect } from "react";
import Axios from "axios";
import Navigatie from "./navFoot/navbar";
import Footer from "./navFoot/Footer";
import Voorstelling from "./Voorstelling";

function VoorstellingDetail(prop) {
    
    const [voorstelling, setVoorstelling] = useState([]);
    const [zaal, setZaal] = useState([]);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const voorstellingId = queryParameters.get("itemId");
        
        Axios.get(`https://localhost:7260/api/Voorstelling/${voorstellingId}`).then((res) => {
            setVoorstelling(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() => { 
        
        Axios.get(`https://localhost:7260/api/Zaal/${zaal.ZaalId}`).then((res) => {
            setZaal(res.data);
            console.log(res.data);
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
        </div>
        < Footer />
    </>
        
    );
}
export default VoorstellingDetail;