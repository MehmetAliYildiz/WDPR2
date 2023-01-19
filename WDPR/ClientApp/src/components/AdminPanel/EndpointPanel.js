import { Component } from "react";
import axios from 'axios';

export default class EndpointPanel extends Component {

    postToEndpoint(url, body) {
        const endpoint = 'https://localhost:7260/' + url;
        let response;
        try {
            response = axios.post(endpoint, body);
        } catch (err) {
            console.error(err);
        }

        return response;
    }

    test() {
        console.log("hi");
    }
}