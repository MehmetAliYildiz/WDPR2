import { Component } from "react";
import ZaalPanel from "./ZaalPanel";

export default class AdminPanel extends Component {
    render() {
        return (
            <div>
                <h1>Admin Panel</h1>
                <ZaalPanel />
            </div>
        );
    }
}