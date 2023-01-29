import React, { Component } from 'react';
import Flatpickr from "react-flatpickr";
import AppointmentRenderer from './AppointmentRenderer';
import SimpleTimePicker from './SimpleTimePicker';
import SchedulerTable from './SchedulerTable';
import Popup from '../Popup';
import "./../../style/FlatpickrCustom.css";
import './../../style/Scheduler.css';
import GetEndpoint from '../Admin/EndPointUtil';

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            appointmentPopup: false,
            popupFocusFlag: false,
            remoteAppointments: [],
            appointments: [],
            rendererRef: React.createRef(),
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.appointments != this.state.appointments) {
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage = () => {
        if (this.state.appointments == null) return;
        console.log("Updated: " + (this.state.appointments == null));
        localStorage.setItem("appointments", JSON.stringify(this.state.appointments));
    }

    getZaalId = event => {
        const queryParameters = new URLSearchParams(window.location.search)
        const zaalId = queryParameters.get("zaalId")

        return (zaalId);
    }

    tryGetAppointment = () => {
        let appointments = this.state.appointments;
        for (let i = 0; i < appointments.length; i++) {
            if (appointments[i].allowModify) {
                return appointments[i];
            }
        }

        return null;
    }

    setDate = dt => {
        this.setState({ date: dt[0] }, this.handleDateChange);
    }

    setAppointmentPopup = (val) => {
        this.setState({ appointmentPopup: val });
    }

    setAppointmentPopupFalse = (val) => {
        this.setState({ appointmentPopup: val });
    }

    handleDateChange() {
        console.log("new date: " + this.state.date);
        this.setState({ remoteAppointments: [] }, this.fetchData);
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

    handleBlur = () => {
        this.setState({ popupFocusFlag: true })
    }

    setPopupFocusFlag = (value) => {
        this.setState({ popupFocusFlag: value });
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

    fetchData = async () => {
        // Fetch alle reserveringen op de huidige dag
        const res = await fetch(GetEndpoint() + `reservering/${this.getZaalId()}/${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1}-${this.state.date.getDate()}`);
        if (!res.ok) {
            throw Error(res.statusText);
            return;
        }

        const data = await res.json();

        console.log(this.state.date.getFullYear() + '-' + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate());

        this.state.remoteAppointments = data.map(r => ({
            startTime: new Date(r.startTijd),
            endTime: new Date(r.eindTijd),
            duration: (new Date(r.eindTijd).getHours() * 60 + new Date(r.eindTijd).getMinutes())
                - (new Date(r.startTijd).getHours() * 60 + new Date(r.startTijd).getMinutes()),
            name: r.naam
        }));

        let appointmentsBasic = JSON.parse(localStorage.getItem("appointments"));
        if (appointmentsBasic !== null) {
            console.log("Length: " + appointmentsBasic.length);

            for (let i = 0; i < appointmentsBasic.length; i++) {
                this.state.appointments.push({
                    id: appointmentsBasic[i].id,
                    startTime: new Date(appointmentsBasic[i].startTime),
                    endTime: new Date(appointmentsBasic[i].endTime),
                    name: appointmentsBasic[i].name,
                    allowModify: true
                });
            }
        }

        this.setState({ appointments: this.state.appointments }, this.state.rendererRef.current.updateAppointments());
        this.setState({ remoteAppointments: this.state.remoteAppointments });
    }

    createAppointment = (startDate, endDate) => {
        if (this.tryGetAppointment() != null) return;

        this.state.selectedAppointment.startTime = new Date(startDate);
        this.state.selectedAppointment.endTime = new Date(endDate);
        this.state.selectedAppointment.name = "";
        this.state.selectedAppointment.allowModify = true;
        this.setState({ appointmentPopup: true })
    }

    // Produceer de html
    render() {
        const weekdayNames = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]
        
        let day = weekdayNames[this.state.date.getDay()]
        let month = monthNames[this.state.date.getMonth()]
        let dateString = `${day}, ${this.state.date.getDate()} ${month} ${this.state.date.getFullYear()}`;
        const handleMouseMove = (event) => {
            this.state.rendererRef.current.handleMouseMove(event);
        }


        return (
            <div data-cy="scheduler" className="scheduler">
                <header>
                    <div className="flatpickr-outer-div">
                        <label htmlFor="datePicker">Datum:&nbsp;</label>
                        <Flatpickr
                            id="datePicker"
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
                        <AppointmentRenderer appointments={this.state.appointments} remoteAppointments={this.state.remoteAppointments} ref={this.state.rendererRef} scheduler={this} />
                        <table data-cy="scheduler-content" className="scheduler-content">
                            <tbody>
                                <tr>
                                    <th style={{ display: "none" }}>
                                        Starttijd
                                    </th>
                                    <th style={{ display: "none" }}>
                                        Eindtijd
                                    </th>
                                </tr>
                                <SchedulerTable date={this.state.date} createFunc={this.createAppointment} />
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer>
                </footer>

                {/* Popup om tijden te kiezen */}
                <Popup
                    trigger={this.state.appointmentPopup}
                    setTrigger={this.setAppointmentPopup}
                    popupFocusFlag={this.state.popupFocusFlag}
                    setPopupFocusFlag={this.setPopupFocusFlag}
                >
                    <form data-cy="appointment-form" onSubmit={this.handleAppointmentSubmit}>
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
                                        <th style={{ display: "none" }}>
                                            Starttijd
                                        </th>
                                        <th style={{display: "none"}}>
                                            Eindtijd
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Van
                                            </label>
                                        </td>
                                        <td>
                                            <SimpleTimePicker date={this.state.selectedAppointment.startTime}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Tot
                                            </label>
                                        </td>
                                        <td>
                                            <SimpleTimePicker date={this.state.selectedAppointment.endTime}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" data-cy="create-appointment-button" onClick={this.handleAppointmentSubmit} onBlur={this.handleBlur}>
                            Klaar
                        </button>
                    </form>
                </Popup>
            </div>
        );
    }
}

export default Scheduler;