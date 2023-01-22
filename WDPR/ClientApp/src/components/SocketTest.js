import io from 'socket.io-client';
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { useState, useRef, useEffect } from 'react';

function SocketTest() {
    const [data, setData] = useState();
    const connection = useRef(null);

    useEffect(() => {
        connection.current = new HubConnectionBuilder()
            .withUrl("https://localhost:7260/myhub", {
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