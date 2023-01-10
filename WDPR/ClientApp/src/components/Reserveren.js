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

    const handleButtonClick = (zaalId) => {
        navigate(`/reserveren/zaal?zaalId=${zaalId}`);
        console.log(`Button with zaalId ${zaalId} clicked`);
    };

    return (
        <div>
            <NavBar></NavBar>
            <h1>Select an object to rent:</h1>
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