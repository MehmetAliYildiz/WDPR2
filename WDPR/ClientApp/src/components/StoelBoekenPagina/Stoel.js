import React, { useState } from "react";
import stoelAfbeelding from './Images/Seat.png';
import stoelAfbeeldingSelect from './Images/Seat-selected.png';


export default function Stoel(props) {
    const id = props.id;
    const [selectedSeat, setSelectedSeat] = useState(null);
        
    return (
        <div key={id} className ="zaal-grid-stoel" onClick={() => setSelectedSeat(selectedSeat === id ? null : id)}>
        <img 
            src={selectedSeat === id ? stoelAfbeeldingSelect : stoelAfbeelding} 
            className="image"
        />
        </div>
    );
}