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
                    <Appointment
                        key={"appointment-" + this.props.appointments[i].id}
                        appointment={this.props.appointments[i]}
                        allAppointments={this.props.appointments} ref={ref}
                        parentDivRef={this.state.parentRef}
                        renderer={this}
                        scheduler={this.state.scheduler}
                        elementIndex={i} />
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
            if (this.state.refs[i].current == null) return;
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

export default AppointmentRenderer;