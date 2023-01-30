import React, { Component } from 'react';
import { calcMinutes, validateBoundary, validate, appendZero } from './SchedulerUtil';
import './../../style/Scheduler.css';

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment,
            allAppointments: props.allAppointments,
            renderer: props.renderer,
            scheduler: props.scheduler,
            removed: false,
            elementIndex: props.elementIndex,
            calcVars: {
                su: 'vh', // Size unit
                supx: 1,  // Size unit (in pixels)
                offset: 2,
                minimumTimeMinutes: 15,
                minimumTimeUH: 5, // Unit height
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
            },

            buttonRef: React.createRef(),
            parentDivRef: props.parentDivRef,
            outerDivRef: React.createRef(),

            transformState: {
                dragging: false,
                resizing: "false",
                initialMousePosition: {
                    x: 0,
                    y: 0
                },
                savedSize: {
                    x: 0,
                    y: 0
                },
                currentSize: {
                    x: 0,
                    y: 0
                },
                savedPosition: {
                    x: 0,
                    y: 0
                },
                currentPosition: {
                    x: 0,
                    y: 0
                }
            }
        }
    }

    // Veelgebruikte berekening
    getMinuteDenom() {
        return this.state.calcVars.minimumTimeMinutes / this.state.calcVars.minimumTimeUH;
    }

    getClientX(event) {
        return (event.clientX);
    }

    getClientY(event) {
        return (event.clientY + (this.state.calcVars.offset * this.state.calcVars.supx * 20));
    }

    // Calculate what the size unit is in pixels
    calcUnit() {
        switch (this.state.calcVars.su) {
            case 'vh':
                this.state.calcVars.supx = this.state.calcVars.windowHeight / 100;
                break;
            case 'vw':
                this.state.calcVars.supx = this.state.calcVars.windowWidth / 100;
                break;
            case 'px':
                this.state.calcVars.supx = 1;
                break;
        }

        // Update the state
        this.setState({
            calcVars: this.state.calcVars
        });
    }

    // De nieuwe tijden berekenen nadat er een mutatie heeft plaatsgevonden
    calcNewTimes() {
        let startMinutes = this.state.transformState.currentPosition.y * this.getMinuteDenom();
        let endMinutes = (this.state.transformState.currentPosition.y + this.state.transformState.currentSize.y) * this.getMinuteDenom();

        this.state.appointment.startTime.setMinutes(startMinutes % 60);
        this.state.appointment.startTime.setHours(Math.floor(startMinutes / 60));
        this.state.appointment.endTime.setMinutes(endMinutes % 60);
        this.state.appointment.endTime.setHours(Math.floor(endMinutes / 60));

        this.state.appointment.duration = endMinutes - startMinutes;

        this.setState({
            appointment: this.state.appointment
        });
    }

    // Called when the window size changes
    handleResize() {
        this.state.calcVars.windowWidth = window.innerWidth;
        this.state.calcVars.windowHeight = window.innerHeight;

        this.calcUnit();
    }

    // Set starting height and position
    componentDidMount() {
        if (this.state.appointment.allowModify) {
            if (this.state.appointment.duration == null) {
                let app = this.state.appointment;
                this.state.appointment.duration = app.endTime.getHours() * 60 + app.endTime.getMinutes() - (app.startTime.getHours() * 60) - app.startTime.getMinutes()
                this.setState({ appointment: this.state.appointment });
            }
        }
        let startPos = (calcMinutes(this.state.appointment.startTime) / this.getMinuteDenom());
        let startHeight = (this.state.appointment.duration / this.getMinuteDenom())
        this.state.transformState.savedPosition = {
            x: 0,
            y: startPos
        };
        this.state.transformState.savedSize = {
            x: 60,
            y: startHeight
        };
        this.state.transformState.currentPosition = this.state.transformState.savedPosition;
        this.state.transformState.currentSize = this.state.transformState.savedSize;

        this.calcUnit();

        // Update state
        this.setState({
            transformState: this.state.transformState
        });

        window.addEventListener('resize', this.handleResize)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allAppointments !== this.props.allAppointments) {
            console.log("Test: " + this.props.allAppointments.length);
            this.state.allAppointments = this.props.allAppointments;
            this.setState({ allAppointments: this.state.allAppointments });
        }
    }

    // Ruim de eventlisteners op als het component verwijdert wordt
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    // Aangeroepen wanneer de cursor zich verplaatst binnen de <div> waarmee deze functie wordt aangeroepen
    handleMouseMove = (event) => {
        if (this.state.transformState.dragging) {
            // De nieuwe positie zodat het element de muis volgt
            let currentXActual = this.state.transformState.savedPosition.x + this.getClientX(event) - this.state.transformState.initialMousePosition.x;
            let currentYActual = this.state.transformState.savedPosition.y + (this.getClientY(event) - this.state.transformState.initialMousePosition.y) / this.state.calcVars.supx;
            let currentYFloored = Math.floor(currentYActual / (this.state.calcVars.minimumTimeUH)) * this.state.calcVars.minimumTimeUH;

            let minuteDenom = this.getMinuteDenom();
            let isValid = validateBoundary(currentYFloored, 10, minuteDenom);
            for (let i = 0; i < this.state.allAppointments.length; i++) {
                if (this.state.allAppointments[i] === this.state.appointment) continue;
                let otherApp = this.state.allAppointments[i];

                if (!validate(otherApp, currentYFloored, this.state.transformState.currentSize.y, minuteDenom, this.state.calcVars.offset)) isValid = false;
            }
            // De nieuwe positie die met Math.floor aangepast wordt zodat het element alleen maar stapsgewijs beweegt
            this.state.transformState.currentPosition = {
                x: currentXActual,
                y: isValid ? currentYFloored : this.state.transformState.currentPosition.y
            };

            // State updaten
            this.setState({
                transformState: this.state.transformState
            });

            this.calcNewTimes();
            return;
        }

        switch (this.state.transformState.resizing) {
            case 'nw':
                this.handleResize(event, "left", "up");
                break;
            case 'n':
                this.handleResize(event, "false", "up");
                break;
            case 'ne':
                this.handleResize(event, "right", "up");
                break;
            case 'w':
                this.handleResize(event, "left", "false");
                break;
            case 'e':
                this.handleResize(event, "right", "false");
                break;
            case 'sw':
                this.handleResize(event, "left", "down");
                break;
            case 's':
                this.handleResize(event, "false", "down");
                break;
            case 'se':
                this.handleResize(event, "right", "down");
                break;
        }

        if (this.state.transformState.resizing != "false") {
            this.calcNewTimes();
        }
    }

    handleResize = (event, horz, vert) => {
        // Pas de grootte van het element aan op basis van de muis positie
        // false = 0, dus de waarde vermenigvuldigen met (x != false) betekent dat als x false is, er niks toegevoegd wordt, dit is iets sneller dan een if statement
        let modX = ((horz != "false") * (this.getClientX(event) - this.state.transformState.initialMousePosition.y) / this.state.calcVars.supx);
        let modY = ((vert != "false") * (this.getClientY(event) - this.state.transformState.initialMousePosition.y) / this.state.calcVars.supx);

        let newSizeY = this.state.transformState.savedSize.y
            + (vert == "down" ? 1 : -1) * Math.floor(modY / this.state.calcVars.minimumTimeUH) * this.state.calcVars.minimumTimeUH;
        let newPosY = this.state.transformState.savedPosition.y +
            (Math.floor(modY / this.state.calcVars.minimumTimeUH) * this.state.calcVars.minimumTimeUH * (vert == "up"));

        let minuteDenom = this.getMinuteDenom();
        let isValid = validateBoundary(newPosY, newSizeY, minuteDenom);
        for (let i = 0; i < this.state.allAppointments.length; i++) {
            if (this.state.allAppointments[i] === this.state.appointment) continue;
            let otherApp = this.state.allAppointments[i];

            if (!validate(otherApp, newPosY, newSizeY, minuteDenom)) isValid = false;
        }

        this.state.transformState.currentSize = {
            x: isValid ? this.state.transformState.savedSize.x
                + (horz == "right" ? 1 : -1) * modX : this.state.transformState.currentSize.x,
            y: isValid ? newSizeY : this.state.transformState.currentSize.y
        };

        this.state.transformState.currentPosition = {
            x: isValid ? this.state.transformState.savedPosition.x +
                (modX * (horz == "left")) : this.state.transformState.currentPosition.x,
            y: isValid ? newPosY : this.state.transformState.currentPosition.y
        }

        // Voor het geval er iets misgaat en de huidige positie/grootte naar iets wat geen getal is wordt gezet, vergeet de nieuwe waarde dan
        if (isNaN(this.state.transformState.currentPosition.x) || isNaN(this.state.transformState.currentPosition.y)) {
            this.state.transformState.currentPosition.x = this.state.transformState.savedPosition.x;
            this.state.transformState.currentPosition.y = this.state.transformState.savedPosition.y;
        }
        if (isNaN(this.state.transformState.currentSize.x) || isNaN(this.state.transformState.currentSize.y)) {
            this.state.transformState.currentSize.x = this.state.transformState.savedSize.x;
            this.state.transformState.currentSize.y = this.state.transformState.savedSize.y;
        }

        // State updaten
        this.setState({
            transformState: this.state.transformState
        });
    }

    // Aangeroepen wanneer de linkermuisknop ingedrukt wordt
    handleMouseDown = (event, type) => {
        this.state.transformState.dragging = type == "move"; // Zet `dragging` = true als `type` gelijk is aan "move"
        this.state.transformState.resizing = type != "move" ? type : "false"; // Geef `resizing` anders de waarde van `type`
        this.state.transformState.initialMousePosition = {
            x: this.getClientX(event),
            y: this.getClientY(event)
        };

        this.setState({
            transformState: this.state.transformState
        });
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    // Uitgevoerd wanneer de linkermuisknop losgelaten wordt
    handleMouseUp = (event) => {
        this.state.transformState.savedPosition = this.state.transformState.currentPosition;
        this.state.transformState.savedSize = this.state.transformState.currentSize;
        this.state.transformState.dragging = false;
        this.state.transformState.resizing = "false";

        this.setState({
            transformState: this.state.transformState
        });
        document.removeEventListener('mouseup', this.handleMouseUp);

        this.state.scheduler.saveToLocalStorage();
    }

    // Verwijder de huidige appointment
    removeElement = () => {
        this.state.scheduler.setState({
            appointments: this.state.scheduler.state.appointments.filter(a => a !== this.state.appointment)
        });
        this.setState({
            removed: true
        });

        const localAppointments = JSON.parse(localStorage.getItem("appointments"));
        for (let i = 0; i < localAppointments.length; i++) {
            if (localAppointments[i].id == this.state.appointment.id) {
                localAppointments.splice(i, 1);
            }
        }

        localStorage.setItem("appointments", JSON.stringify(localAppointments));
    };

    // Render de appointment
    render() {
        const deadEnd = (event) => { }
        const buttonStyle = {
            position: 'absolute',
            height: `${this.state.transformState.currentSize.y}${this.state.calcVars.su}`,
            left: 0,
            top: `${this.state.transformState.currentPosition.y + this.state.calcVars.offset}${this.state.calcVars.su}`
        };
        let appointment = this.state.appointment;
        let cursorStyle = appointment.allowModify ? "move" : "default";
        let moveMouseDown = appointment.allowModify ? (event) => this.handleMouseDown(event, "move") : deadEnd;

        // De knoppen om de appointment van grootte te veranderen
        const resizingTable = (
            <div className="resizing-table">
                <div className="resizing-table-row">
                    <div style={{ width: "10px", height: "10px", cursor: "nw-resize" }} onMouseDown={event => this.handleMouseDown(event, "nw")}></div>
                    <div style={{ flex: 1, cursor: "n-resize" }} onMouseDown={event => this.handleMouseDown(event, "n")}></div>
                    <div style={{ width: "10px", height: "10px", cursor: "ne-resize" }} onMouseDown={event => this.handleMouseDown(event, "ne")}></div>
                </div>
                <div className="resizing-table-row" style={{ height: "100%" }}>
                    <div style={{ width: "10px", cursor: "w-resize" }} onMouseDown={event => this.handleMouseDown(event, "w")}></div>
                    <div style={{ flex: 1, height: "100%", zIndex: "-1" }}></div>
                    <div style={{ width: "10px", cursor: "e-resize" }} onMouseDown={event => this.handleMouseDown(event, "e")}></div>
                </div>
                <div className="resizing-table-row">
                    <div style={{ width: "10px", height: "10px", cursor: "sw-resize" }} onMouseDown={event => this.handleMouseDown(event, "sw")}></div>
                    <div style={{ flex: 1, cursor: "s-resize" }} onMouseDown={event => this.handleMouseDown(event, "s")}></div>
                    <div style={{ width: "10px", height: "10px", cursor: "se-resize" }} onMouseDown={event => this.handleMouseDown(event, "se")}></div>
                </div>
            </div>
        );

        const removeButton = (
            <button title="Verwijder reservering" className="remove-button" onClick={this.removeElement}>
                <svg viewBox="0 0 16 16" width="1.5em" height="1.5em" role="presentation" focusable="false" aria-hidden="false">
                    <path d="M11.868 3.205L8 7.072 4.133 3.205l-.928.927L7.073 8l-3.868 3.867.928.928L8 8.927l3.868 3.868.927-.928L8.928 8l3.867-3.868-.927-.927z"></path>
                </svg>
            </button>
        );

        return this.state.removed ? ("") : (
            <div className="appointment-outer" style={buttonStyle} ref={this.state.outerDivRef}>
                {appointment.allowModify ? removeButton : ""}
                {appointment.allowModify ? resizingTable : ""}
                <button type="button" ref={this.state.buttonRef} className="appointment" disabled={!appointment.allowModify} onMouseDown={moveMouseDown} style={{ cursor: cursorStyle }}>
                    <label style={{ cursor: cursorStyle }}>
                        <div style={{ cursor: cursorStyle }}>
                            <h2 className="appointment" style={{ cursor: cursorStyle }}>
                                {this.state.appointment.name}
                            </h2>
                            <h3 className="appointment" style={{ cursor: cursorStyle }}>
                                {appendZero(appointment.startTime.getHours())}:{appendZero(appointment.startTime.getMinutes())} - {appendZero(appointment.endTime.getHours())}:{appendZero(appointment.endTime.getMinutes())}
                            </h3>
                        </div>
                    </label>
                </button>
            </div>
        );
    }
}

export default Appointment;