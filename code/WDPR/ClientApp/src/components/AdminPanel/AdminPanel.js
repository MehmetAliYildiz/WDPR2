import { Component } from "react";
import PostPanel from "./PostPanel";
import GetPanel from "./GetPanel";

export default class AdminPanel extends Component {
    render() {
        const zaalPostFields =
            [
                {
                    id: "zaal-eersterangs",
                    key: "eersteRangs",
                    name: "Aantal Eersterangsstoelen",
                    type: "integer"
                },
                {
                    id: "zaal-tweederangs",
                    key: "tweedeRangs",
                    name: "Aantal Tweederangsstoelen",
                    type: "integer"
                },
                {
                    id: "zaal-derderangs",
                    key: "derdeRangs",
                    name: "Aantal Derderangsstoelen",
                    type: "integer"
                }
            ];
        const zaalPostExtraData = {
            id: 0,
            stoelen: []
        }
        const zaalGetFields = [
            {
                id: "zaal-id",
                key: "id",
                name: "ID",
                type: "integer"
            }
        ]
        return (
            <div>
                <h1>Admin Panel</h1>
                <PostPanel fields={zaalPostFields} extraData={zaalPostExtraData} endPoint="Zaal" title="Maak een zaal aan" />
                <GetPanel fields={zaalGetFields} endPoint="Zaal/zaal" title="Vraag een zaal op" />
            </div>
        );
    }
}