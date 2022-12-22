import React, { useState } from 'react';

function Reserveren() {
    const [selectedObject, setSelectedObject] = useState(null);

    const handleObjectSelection = (object) => {
        setSelectedObject(object);
        navigateToWebForm(object);
    }

    return (
        <div>
            <h1>Select an object to rent:</h1>
            <button onClick={() => handleObjectSelection('Bicycle')}>Zaal 1</button>
            <button onClick={() => handleObjectSelection('Kayak')}>Zaal 2</button>
            <button onClick={() => handleObjectSelection('Tent')}>Zaal 3</button>
            <button onClick={() => handleObjectSelection('Camping stove')}>Zaal 4</button>
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