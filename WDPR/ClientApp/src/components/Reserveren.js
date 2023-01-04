import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ZaalLijst from './ZaalLijst';

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
            <h1>Select an object to rent:</h1>
            <ZaalLijst onButtonClick={handleButtonClick} />
            {selectedObject && <button onClick={() => navigateToWebForm(selectedObject)}>Next</button>}
        </div>
    );
}

function WebFormPage({ selectedObject }) {
    return (
        <form>
            <input type="hidden" name="selectedObject" value={selectedObject} />
            {/* other form fields go here */}
            <button type="submit">Submit</button>
        </form>
    );
}

function navigateToWebForm(selectedObject) {
    // navigate to the web form page, passing the selectedObject as a prop
}

export default Reserveren;