import EndpointPanel from './EndpointPanel';
import axios from 'axios';
import FocusableInput from './FocusableInput';
import React from 'react';
import IntegerField from './IntegerField';

export default class PostPanel extends EndpointPanel {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            fields: props.fields,
            title: props.title,
            endpoint: props.endPoint,
            extraData: props.extraData,
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
        let data = {}
        for (let i = 0; i < this.state.fields.length; i++) {
            console.log(this.state.fields[i].id);
            console.log(this.state.formData["zaal-eersterangs"]);
            data[this.state.fields[i].key] = this.state.formData[this.state.fields[i].id] || this.defaultForType(this.state.fields[i]);
        }
        data = { ...data, ...this.state.extraData };

        const status = await this.postToEndpoint(this.state.endpoint, data);
        this.setState({
            postStatus: JSON.stringify(status)
        });
    }

    render() {
        let fieldSections = [];
        for (let i = 0; i < this.state.fields.length; i++) {
            fieldSections.push(this.createField(this.state.fields[i]));
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h3>
                        {this.state.title}: 
                    </h3>
                    {fieldSections}
                    <button type="button" onClick={this.handlePostSubmit}>
                        Maak aan
                    </button>
                </form>
                <label>
                    Response:
                    <br />
                    <textarea value={this.state.postStatus} readOnly /> 
                </label>
            </div>
        );
    }
}