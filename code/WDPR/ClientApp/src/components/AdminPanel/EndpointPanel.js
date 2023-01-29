import { Component } from "react";
import axios from 'axios';
import IntegerField from './IntegerField';
import GetEndpoint from "../Admin/EndPointUtil";
export default class EndpointPanel extends Component {

    async postToEndpoint(url, body) {
        let res = null;
        let err;
        await axios.post(GetEndpoint() + url, body)
            .then(response => {
                res = response;
            })
            .catch(error => {
                err = error;
            });

        return res == null ? err : res;
    }

    async getFromEndpoint(url) {
        let data;
        let err;
        await axios.get(GetEndpoint() + url)
            .then(response => {
                data = response.data;
            })
            .catch(error => {
                err = error;
            });

        return data == null ? err : data;
    }

    createField(field) {
        switch (field.type) {
            case 'boolean':
            case 'integer':
                return this.getField(field.name, (
                    <IntegerField id={field.id} onChange={this.handleChange} />
                ));
            default:
        }
    }

    defaultForType(field) {
        switch (field.type) {
            case 'boolean':
                return false;
            case 'integer':
                return 0;
            case 'string':
                return "";
            default:
                return null;
        }
    }

    getField(name, input) {
        return (
            <div>
                <label>
                    {name}:&nbsp;
                    {input}
                </label><br />
            </div>
        );
    }
}