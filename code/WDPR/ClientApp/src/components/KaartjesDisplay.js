import React, { Component } from 'react';

export default class KaartjesDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kaartje: props.kaartje
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.kaartje.code}</p>
            </div>
        );
    }
}