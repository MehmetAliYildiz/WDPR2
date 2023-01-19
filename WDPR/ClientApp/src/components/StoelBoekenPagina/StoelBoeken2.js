import './StoelBoeken.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function StoelBoeken2() {

    const [zaal, setZaal] = useState([]);

    const queryParameters = new URLSearchParams(window.location.search);
    const zaalId = queryParameters.get("zaalid");

    useEffect(() => {
        Axios.get(`https://localhost:7260/zaal/zaal/${zaalId}`).then((res) => {
            setZaal(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <>
            {zaal.map((item) => (
                <div key={item.id}>
                    <p>{item.id}</p>
                </div>
            ))}
        </>
    );
}