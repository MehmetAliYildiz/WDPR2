import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import Popup from './Popup';
import "./../style/FlatpickrCustom.css";
import './../style/Scheduler.css';

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            appointmentPopup: false,
            appointments: [],
            selectedAppointment: {
                startTime: new Date(),
                endTime: new Date(),
                name: "",
                duration: 0,
                allowModify: true
            }
        };

        this.setAppointmentPopupFalse = this.setAppointmentPopup.bind(this, false);
        this.handleAppointmentNameChange = this.handleAppointmentNameChange.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount = async () => {
        this.fetchData();
    }

    setDate = dt => {
        this.setState({ date: dt[0] }, this.handleDateChange);
    }

    handleDateChange() {
        console.log("new date: " + this.state.date);
        this.setState({ appointments: [] }, this.fetchData);
    }

    fetchData = async () => {
        // Fetch alle reserveringen op de huidige dag
        const res = await fetch('https://localhost:7260/reservering/' + this.state.date.getFullYear() + '-' + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate());
        const data = await res.json();

        console.log(this.state.date.getFullYear() + '-' + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate());

        this.state.appointments = data.map(r => ({
            startTime: new Date(r.startTijd),
            endTime: new Date(r.eindTijd),
            duration: (new Date(r.eindTijd).getHours() * 60 + new Date(r.eindTijd).getMinutes())
                - (new Date(r.startTijd).getHours() * 60 + new Date(r.startTijd).getMinutes()),
            name: r.naam
        }));

        this.setState({ appointments: this.state.appointments });

        console.log(this.state.appointments.length);
    }

    setAppointmentPopup = (val) => {
        this.setState({ appointmentPopup: val });
    }

    setAppointmentPopupFalse = (val) => {
        this.setState({ appointmentPopup: val });
    }

    halfHourTern = (i) => {
        return i % 2 == 1 ? ("30") : ("00");
    }

    formatHour = (i) => {
        return i < 10 ? (`0${i}`) : (`${i}`)
    }

    createAppointment = (startDate, endDate) => {
        this.state.selectedAppointment.startTime = new Date(startDate);
        this.state.selectedAppointment.endTime = new Date(endDate);
        this.state.selectedAppointment.name = "";
        this.state.selectedAppointment.allowModify = true;
        this.setState({ appointmentPopup: true })
    }

    calcTime = (i) => {
        return (`${this.formatHour(Math.floor(i / 2))}:${this.halfHourTern(i)}`);
    }

    appendZero = (val) => {
        return val < 10 ? `0${val}` : `${val}`;
    }

    dateToTime = (date) => {
        let m = this.appendZero(date.getMinutes());
        let h = this.appendZero(date.getHours());

        return (`${h}:${m}`)
    }

    createTable = (date) => {
        let table = []
        let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        // Outer loop to create rows
        for (let i = 0; i < 48; i++) {
            let children = []
            // Inner loop to create columns
            for (let j = 0; j < 1; j++) {
                // Create cell
                if (Math.floor(i % 2) < 1) {
                    children.push(
                        <td className="scheduler-row-label" rowSpan={2}>
                            {this.calcTime(i)}
                        </td >
                    );
                }
                children.push(
                    <td key={j * i}>
                        <button className="scheduler-row" style={{ height: "10vh", top: `${i * 10 + 2}vh`, position: "absolute"}} type="button" onClick={() => this.createAppointment(`${dateString} ${this.calcTime(i)}`, `${dateString} ${this.calcTime(i + 1)}`)}>
                            {/* {`Row ${i + 1} ${this.calcTime(i)}`}*/}
                        </button>
                    </td>
                )
            }
            //Create the parent and add the children
            table.push(<tr key={ i }>{children}</tr>)
        }
        return table
    }

    createTimePicker = (date) => {
        let selectHours = [];
        let selectMinutes = [];
        for (let i = 0; i < 24; i++) {
            selectHours.push(
                <option value={i}>
                    {appendZero(i)}
                </option>
            );
        }
        for (let i = 0; i < 4; i++) {
            selectMinutes.push(
                <option value={i * 15}>
                    {appendZero(i * 15)}
                </option>
            );
        }

        return (
            <div className="time-picker">
                <select defaultValue={date.getHours()} onChange={(event) => this.handleAppointmentHourChange(event, date)}>
                    {selectHours}
                </select>
                <label style={{ display: "inline" }}> : </label>
                <select defaultValue={date.getMinutes()} onChange={(event) => this.handleAppointmentMinuteChange(event, date)}>
                    {selectMinutes}
                </select>
            </div>
        );
    }

    handleAppointmentSubmit = () => {
        let st = this.state.selectedAppointment.startTime;
        let et = this.state.selectedAppointment.endTime;
        let newAppointment = [
            {
                id: this.state.appointments.length,
                startTime: st,
                endTime: et,
                name: this.state.selectedAppointment.name,
                duration: ((et.getHours() - st.getHours()) * 60 + et.getMinutes() - st.getMinutes()),
                allowModify: this.state.selectedAppointment.allowModify
            }
        ];
        this.setState({
            // Concats the two arrays into one
            appointments: [...this.state.appointments, ...newAppointment]
        })
        this.setAppointmentPopupFalse();
    }

    handleAppointmentHourChange = (event, date) => {
        date.setHours(event.target.value);
        this.setState({ selectedAppointment: this.state.selectedAppointment });
    }

    handleAppointmentMinuteChange = (event, date) => {
        date.setMinutes(event.target.value);
        this.setState({ selectedAppointment: this.state.selectedAppointment });
    }

    handleAppointmentNameChange = (event) => {
        this.state.selectedAppointment.name = event.target.value;
        this.setState({ selectedAppointment: this.state.selectedAppointment });
    }

    handleMouseMove = (event) => {
        this.state.appointmentRef.current.handleMouseMove(event);
    }

    render() {
        const weekdayNames = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]
        
        let day = weekdayNames[this.state.date.getDay()]
        let month = monthNames[this.state.date.getMonth()]
        let dateString = `${day}, ${this.state.date.getDate()} ${month} ${this.state.date.getFullYear()}`;
        let ref = React.createRef();
        const handleMouseMove = (event) => {
            ref.current.handleMouseMove(event);
        }


        return (
            <div className="scheduler">
                <header>
                    <div className="flatpickr-outer-div">
                        <label>Datum:&nbsp;</label>
                        <Flatpickr
                            value={this.state.date}
                            onChange={date => this.setDate(date)}
                            options={{
                                minDate: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate() + 1}`
                            }}
                        />
                    </div>
                </header>
                <div className="scheduler-body">
                    <div id="scheduler-back" className="scheduler-back" onMouseMove={handleMouseMove} style={{ position: "relative" }}>
                        <AppointmentRenderer appointments={this.state.appointments} ref={ref} />
                        <table className="scheduler-content">
                            <tbody>
                                {this.createTable(this.state.date)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer>
                </footer>

                {/* Popup om tijden te kiezen */}
                <Popup trigger={this.state.appointmentPopup} setTrigger={this.setAppointmentPopup}>
                    <form onSubmit={this.handleAppointmentSubmit}>
                        <div>
                            <label>
                                Afspraaknaam
                            </label>
                            <br />
                            <input type="text" id="name" name="Afspraaktitel" value={this.state.selectedAppointment.name} onChange={this.handleAppointmentNameChange} />
                            <br />
                        </div>


                        <div>
                            <label>
                                Afspraakduur
                            </label>
                        <br/>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>
                                                Van
                                            </label>
                                        </td>
                                        <td>
                                            {this.createTimePicker(this.state.selectedAppointment.startTime)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Tot
                                            </label>
                                        </td>
                                        <td>
                                            {this.createTimePicker(this.state.selectedAppointment.endTime)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button onClick={this.handleAppointmentSubmit}>
                            Klaar
                        </button>
                    </form>
                </Popup>
            </div>
        );
    }
}

class AppointmentRenderer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refs: [],
            parentRef: React.createRef(),
            appointments: props.appointments,
            elements: [],
            date: props.date
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.appointments !== this.props.appointments) {
            this.setState({ appointments: this.props.appointments });

            let el = [];
            let references = [];
            for (let i = 0; i < this.props.appointments.length; i++) {
                let ref = React.createRef();
                el.push(
                    <Appointment key={"appointment-" + this.props.appointments[i].id} appointment={this.props.appointments[i]} allAppointments={this.props.appointments} ref={ref} parentDivRef={this.state.parentRef} />
                );
                references.push(ref);
            }

            this.setState({
                elements: el,
                refs: references
            });
        }
    }

    handleMouseMove = (event) => {
        for (let i = 0; i < this.state.refs.length; i++) {
            this.state.refs[i].current.handleMouseMove(event);
        }
    }

    render() {
        return (
            <div className="appointments" ref={this.state.parentRef}>
                {this.state.elements}
            </div>
        );
    }
}

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment,
            allAppointments: props.allAppointments,
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
            let currentXActual = this.state.transformState.savedPosition.x +  this.getClientX(event) - this.state.transformState.initialMousePosition.x;
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
    }

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
                    <div style={{ flex: 1, cursor: "n-resize" }}                        onMouseDown={event => this.handleMouseDown(event, "n")}> </div>
                    <div style={{ width: "10px", height: "10px", cursor: "ne-resize" }} onMouseDown={event => this.handleMouseDown(event, "ne")}></div>
                </div>
                <div className="resizing-table-row" style={{ height: "100%" }}>
                    <div style={{ width: "10px", cursor: "w-resize" }}                  onMouseDown={event => this.handleMouseDown(event, "w")}></div>
                    <div style={{ flex: 1, height: "100%", zIndex: "-1" }}>                                                                     </div>
                    <div style={{ width: "10px", cursor: "e-resize" }}                  onMouseDown={event => this.handleMouseDown(event, "e")}></div>
                </div>
                <div className="resizing-table-row">
                    <div style={{ width: "10px", height: "10px", cursor: "sw-resize" }} onMouseDown={event => this.handleMouseDown(event, "sw")}></div>
                    <div style={{ flex: 1, cursor: "s-resize" }}                        onMouseDown={event => this.handleMouseDown(event, "s")}> </div>
                    <div style={{ width: "10px", height: "10px", cursor: "se-resize" }} onMouseDown={event => this.handleMouseDown(event, "se")}></div>
                </div>
            </div>
        );

        return (
            <div className="appointment-outer" style={buttonStyle} >
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

function appendZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
}

function calcMinutes(date) {
    return (date.getHours() * 60 + date.getMinutes());
}

function validate(appointment, ypos, height, minuteDenom, offset) {
    let apStartPos = (appointment.startTime.getHours() * 60 + appointment.startTime.getMinutes()) / minuteDenom;
    let apEndPos = appointment.duration / minuteDenom + apStartPos;
    let endPos = ypos + height;
    if ((ypos > apStartPos && ypos < apEndPos) || (apStartPos > ypos && apStartPos < endPos)) return false;
    if ((endPos > apStartPos && endPos < apEndPos) || (apEndPos > ypos && apEndPos < endPos)) return false;
    if (ypos == apStartPos || endPos == apEndPos) return false;

    return true;
}

function validateBoundary(ypos, height, minuteDenom) {
    if (ypos < 0) return false;
    if (height * minuteDenom < 30) return false;

    return true;
}

export default Scheduler;