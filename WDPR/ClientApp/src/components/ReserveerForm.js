import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import Scheduler from './Scheduler/Scheduler';
import Popup from './Popup';
import Footer from "./navFoot/Footer";
import NavBar from "./navFoot/navbar";
import './../style/ReserveerForm.css'


class ReserveerForm extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            roomId: null,
            redirect: null,
            paymentPopup: false,
            paymentOption: null,
            schedulerRef: React.createRef(),
            validation: {
                validAppointment: false
            }
        };
        this.setPaymentPopupFalse = this.setPaymentPopup.bind(this, false);
    }

    componentDidMount() {
        this.validate();
    }

    async validate() {
        const zaalId = this.getZaalId();
        if (zaalId == null) {
            console.log("ZaalId required");
            this.setState({ redirect: true });
            return;
        }

        const res = await fetch(`https://localhost:7260/Zaal/${zaalId}`); 
        const data = await res.json();
        if (data.length === 0) {
            console.log(`No zaal with ID ${zaalId} found`);
            this.setState({ redirect: true });
            return;
        }

        console.log(res.body);
        this.setState({ buttons: data });

        this.setState({ redirect: false });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getZaalId = event => {
        const queryParameters = new URLSearchParams(window.location.search)
        const zaalId = queryParameters.get("zaalId")

        return (zaalId);
    }

    setPaymentPopup = (val) => {
        this.setState({paymentPopup: val});
    }

    setPaymentOption = (val) => {
        this.setState({ paymentOption: val });
        console.log(val);
    }

    selectedStyle = (value, desiredValue) => {
        return value == desiredValue ? "payment-option-selected" : "payment-option";
    }

    handleBlur = () => {
        this.setState({ popupFocusFlag: true })
    }

    setPopupFocusFlag = (value) => {
        this.setState({ popupFocusFlag: value });
    }

    validateAppointment = () => {
        this.state.validation.validAppointment = this.state.schedulerRef.current.tryGetAppointment() != null;
        this.setState({ validation: this.state.validation });

        return this.state.validation.validAppointment;
    }

    handleSubmit = async event => {
        const zaalId = this.getZaalId();
        if (!this.validateAppointment()) {
            return;
        }

        event.preventDefault();
        const endpoint = 'https://localhost:7260/reservering/post';
        const appointment = this.state.schedulerRef.current.tryGetAppointment();
        const data = {
            naam: appointment.name,
            startTijd: appointment.startTime.toISOString(),
            eindTijd: appointment.endTime.toISOString(),
            bestelling: {
                id: 0,
                bedrag: 0
            },
            zaalId: this.getZaalId()
        };
        try {
            const response = axios.post(endpoint, data);
        } catch (err) {
            console.error(err);
        }
        console.log(
            `Renting room with id ${zaalId} from ${this.state.startDate} to ${this.state.endDate} and ${this.state.schedulerRef.current.tryGetAppointment() != null}`
        );
    };

    render() {
        if (this.state.redirect === true) {
            return (<Navigate to="/reserveren"/>);
        }
        return (
            <div>
                <NavBar></NavBar>
                <h1>
                    Plan een reservering voor zaal {this.getZaalId()}
                </h1>
                <Scheduler ref={this.state.schedulerRef} date={new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate() + 1}`)} />
                <div key="paymentDiv">
                    <button type="button" onClick={() => this.setState({ paymentPopup: true })}>Click me!</button>
                    <Popup
                        trigger={this.state.paymentPopup}
                        setTrigger={this.setPaymentPopup}
                        popupFocusFlag={this.state.popupFocusFlag}
                        setPopupFocusFlag={this.setPopupFocusFlag}
                    >
                        <h2>Payment methods</h2>
                        <br />
                        <div className="payment-options" name="Scrollable Payment Selection Box">
                            <button
                                type="button"
                                onClick={() => this.setState({ paymentOption: "iDeal" })}
                                className={this.selectedStyle(this.state.paymentOption, "iDeal")}
                            >
                                <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600" />
                                <p>
                                    iDeal
                                </p>
                            </button><br />
                            <button
                                type="button"
                                onClick={() => this.setState({ paymentOption: "PayPal" })}
                                className={this.selectedStyle(this.state.paymentOption, "PayPal")}
                            >
                                PayPal
                            </button><br />
                            <button
                                type="button"
                                onClick={() => this.setState({ paymentOption: "Credit" })}
                                className={this.selectedStyle(this.state.paymentOption, "Credit")}
                            >
                                Credit
                            </button><br />
                            <button
                                type="button"
                                onClick={() => this.setState({ paymentOption: "Other" })}
                                className={this.selectedStyle(this.state.paymentOption, "Other")}
                            >
                                Other
                            </button><br />
                        </div>
                        <footer className="popup-footer">
                            <div className="popup-footer-inner">
                                <br />
                                <button
                                    type="button"
                                    onClick={() => this.setState({ paymentOption: "iDeal" })}
                                    className={this.selectedStyle(this.state.paymentOption, "iDeal")}
                                >
                                    <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600" />
                                    <p>
                                        iDeal
                                    </p>
                                </button><br />
                                <button
                                    type="button"
                                    onClick={() => this.setState({ paymentOption: "PayPal" })}
                                    className={this.selectedStyle(this.state.paymentOption, "PayPal")}
                                >
                                    PayPal
                                </button><br />
                                <button
                                    type="button"
                                    onClick={() => this.setState({ paymentOption: "Credit" })}
                                    className={this.selectedStyle(this.state.paymentOption, "Credit")}
                                >
                                    Credit
                                </button><br />
                                <button
                                    type="button"
                                    onClick={() => this.setState({ paymentOption: "Other" })}
                                    className={this.selectedStyle(this.state.paymentOption, "Other")}
                                >
                                    Other
                                </button><br />
                            </div>
                            <footer className="popup-footer">
                                <div className="popup-footer-inner">
                                    <br />
                                    <button
                                        type="button"
                                        disabled={!this.state.paymentOption}
                                        onClick={this.setPaymentPopupFalse}
                                        id="done-button"
                                        name="Click to finish selecting payment"
                                    >
                                        Klaar
                                    </button>
                                </div>
                            </footer>
                        </footer>
                    </Popup>
                </div>

                <button type="submit">Rent Room</button>
                <Footer></Footer>
            </div>
        );
    }
}

export default ReserveerForm;