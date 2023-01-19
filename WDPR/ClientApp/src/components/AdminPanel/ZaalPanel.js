import EndpointPanel from './EndpointPanel';
import axios from 'axios';
import FocusableInput from './FocusableInput';
import React from 'react';
import IntegerField from './IntegerField';

export default class ZaalPanel extends EndpointPanel {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [id]: value }
        }));
    }

    handleSubmit = () => {
        console.log(this.state.formData);
        this.test();

        const data = {
            id: 0,
            stoelen: [],
            eersteRangs: this.state.formData["zaal-eersterangs"] || 0,
            tweedeRangs: this.state.formData["zaal-tweederangs"] || 0,
            derdeRangs: this.state.formData["zaal-derderangs"] || 0
        }

        console.log(data);
        this.postToEndpoint("Zaal", data);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <label>
                        Nieuwe zaal:
                    </label><br />
                    <label>
                        Eersterangs stoelen:
                        <IntegerField
                            id="zaal-eersterangs"   
                            onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Tweederangs stoelen:
                        <IntegerField
                            type="number"
                            id="zaal-tweederangs" />
                    </label><br />
                    <label>
                        Derderangs stoelen:
                        <IntegerField
                            type="number"
                            id="zaal-derderangs" />
                    </label><br />
                    <button type="button" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}