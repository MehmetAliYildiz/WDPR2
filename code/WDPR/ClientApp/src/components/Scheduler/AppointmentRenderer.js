import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Appointment from './Appointment';
import './../../style/Scheduler.css';

class AppointmentRenderer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refs: [],
            scheduler: props.scheduler,
            parentRef: React.createRef(),
            appointments: props.appointments,
            remoteAppointments: props.remoteAppointments,
            allAppointments: props.appointments.concat(props.remoteAppointments),
            elements: [],
            date: props.date
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.appointments !== this.props.appointments) {
            this.updateAppointments();
        }
        if (prevProps.remoteAppointments !== this.props.remoteAppointments) {
            this.setState({ remoteAppointments: this.props.remoteAppointments });
            this.setState({ allAppointments: this.props.appointments.concat(this.props.remoteAppointments) });

            for (let i = 0; i < this.props.remoteAppointments.length; i++) {
                let ref = React.createRef();
                this.state.elements.push(
                    <Appointment
                        key={"appointment-" + this.props.remoteAppointments[i].id}
                        appointment={this.props.remoteAppointments[i]}
                        allAppointments={this.state.allAppointments} ref={ref}
                        parentDivRef={this.state.parentRef}
                        renderer={this}
                        scheduler={this.state.scheduler}
                        elementIndex={i} />
                );
                this.state.refs.push(ref);
            }
            this.setState({
                elements: this.state.elements,
                refs: this.state.refs
            });
        }
    }

    updateAppointments = () => {
        this.setState({ appointments: this.props.appointments });
        this.setState({ allAppointments: this.props.appointments.concat(this.props.remoteAppointments) });

        for (let i = 0; i < this.props.appointments.length; i++) {
            let ref = React.createRef();
            this.state.elements.push(
                <Appointment
                    key={"appointment-" + this.props.appointments[i].id}
                    appointment={this.props.appointments[i]}
                    allAppointments={this.state.allAppointments} ref = { ref }
                    parentDivRef={this.state.parentRef}
                    renderer={this}
                    scheduler={this.state.scheduler}
                    elementIndex={i} />
            );
            this.state.refs.push(ref);
        }
        this.setState({
            elements: this.state.elements,
            refs: this.state.refs
        });
    }

    handleMouseMove = (event) => {
        for (let i = 0; i < this.state.refs.length; i++) {
            if (this.state.refs[i].current == null) return;
            this.state.refs[i].current.handleMouseMove(event);
        }
    }

    render() {
        return (
            <div className="appointments" data-cy="appointments" ref={this.state.parentRef}>
                {this.state.elements}
            </div>
        );
    }
}

export default AppointmentRenderer;