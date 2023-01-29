import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ZaalLijst from './ZaalLijst';
import Footer from "./navFoot/Footer";
import NavBar from "./navFoot/navbar";

function Reserveren() {
    const [selectedObject, setSelectedObject] = useState(null);

    const handleObjectSelection = (object) => {
        setSelectedObject(object);
        navigateToWebForm(object);
    }

    const navigate = useNavigate();

    const handleButtonClick = (ruimteId) => {
        navigate(`/reserveren/ruimte?ruimteId=${ruimteId}`);
        console.log(`Button with id ${ruimteId} clicked`);
    };

    return (
        <div>
            <NavBar></NavBar>
            <h1>Huur een ruimte</h1>
            <ZaalLijst onButtonClick={handleButtonClick} />
            {selectedObject && <button onClick={() => navigateToWebForm(selectedObject)}>Next</button>}
            <Footer style={{ bottom: "0%", position: "fixed", width: "100vw" }} />
        </div>
    );
}

function navigateToWebForm(selectedObject) {
    // navigate to the web form page, passing the selectedObject as a prop
}

export default Reserveren;