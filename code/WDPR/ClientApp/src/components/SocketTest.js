import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { useState, useRef, useEffect } from 'react';
import GetEndpoint from "./Admin/EndPointUtil";

function SocketTest() {
    const [data, setData] = useState();
    const connection = useRef(null);

    useEffect(() => {
        connection.current = new HubConnectionBuilder()
            .withUrl(GetEndpoint+"/myhub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();

        connection.current.start().then(() => {
            console.log("Connected!");
        });

        connection.current.on("ReceiveData", (newData) => {
            setData(newData);
        });

        return () => {
            connection.current.stop();
        };
    }, []);

    return <div>{data}</div>
}

export default SocketTest;