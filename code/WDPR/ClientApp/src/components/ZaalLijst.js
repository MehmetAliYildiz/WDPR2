import React, { Component } from "react";
import GetEndpoint from "./Admin/EndPointUtil";

class ZaalLijst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        };
    }

    componentDidMount = async () => {
        const res = await fetch(GetEndpoint() + "VrijeRuimte");
        console.log(res.body);
        const data = await res.json();
        this.setState({ buttons: data });
    };
    generateButtons = response => {
        const buttons = response.map(zaal => {
            return (
                <button
                    key={`Zaal ${zaal.id}`}
                    onClick={this.props.onButtonClick.bind(this, zaal.id)}
                >
                    Zaal {zaal.id}
                </button>
            );
        });

        // Return the array of buttons
        return buttons;
    };

    render() {
        return <div data-cy="zaal-lijst">{this.generateButtons(this.state.buttons)}</div>;
    }
}

export default ZaalLijst;