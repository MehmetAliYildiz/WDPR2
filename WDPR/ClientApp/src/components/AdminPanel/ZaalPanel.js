import EndpointPanel from './EndpointPanel';
import axios from 'axios';
import FocusableInput from './FocusableInput';
import React from 'react';
import IntegerField from './IntegerField';

export default class ZaalPanel extends EndpointPanel {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            postStatus: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [id]: value }
        }));
    }

    handlePostSubmit = async () => {
        const data = {
            id: 0,
            stoelen: [],
            eersteRangs: this.state.formData["zaal-eersterangs"] || 0,
            tweedeRangs: this.state.formData["zaal-tweederangs"] || 0,
            derdeRangs: this.state.formData["zaal-derderangs"] || 0
        }

        const status = await this.postToEndpoint("Zaal", data);
        this.setState({
            postStatus: JSON.stringify(status)
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h3>
                        Nieuwe zaal:
                    </h3>
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
                    <button type="button" onClick={this.handlePostSubmit}>
                        Submit
                    </button>
                </form>
                <textarea value={this.state.postStatus} readOnly />
            </div>
        );
    }
}