import { Component } from "react";
import axios from 'axios';

export default class EndpointPanel extends Component {

    async postToEndpoint(url, body) {
        const endpoint = 'https://localhost:7260/' + url;
        let res = await axios.post(endpoint, body)

        console.log(res.status);
        return res;
    }

    test() {
        console.log("hi");
    }
}