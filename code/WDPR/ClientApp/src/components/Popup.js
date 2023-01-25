import React, { Component } from "react";
import { useEffect, useState } from 'react';
import './../style/Popup.css'

function Popup(props) {
    const popupRef = React.createRef();

    useEffect(() => {
        if (props.trigger) {
            popupRef.current.focus();
        }
        if (props.popupFocusFlag) {
            popupRef.current.focus();
            props.setPopupFocusFlag(false);
        }
    }, [props.trigger, props.popupFocusFlag, props.setPopupFocusFlag]);

    // Als de trigger bool die aan de functie wordt meegegeven true is, return dan de dingen in de div, anders return een lege string
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button title="Close popup" className="close-button" onClick={() => props.setTrigger(false)} ref={popupRef}>
                    <svg viewBox="0 0 16 16" width="2em" height="2em" role="presentation" focusable="false" aria-hidden="false">
                        <path d="M11.868 3.205L8 7.072 4.133 3.205l-.928.927L7.073 8l-3.868 3.867.928.928L8 8.927l3.868 3.868.927-.928L8.928 8l3.867-3.868-.927-.927z"></path>
                    </svg>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;