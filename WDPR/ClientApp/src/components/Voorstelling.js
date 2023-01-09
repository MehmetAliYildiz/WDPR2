import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Voorstelling.css";
import 'bootstrap/dist/css/bootstrap.css';
function Voorstelling() {

    const [post, setPost] = useState([]);
    const [searchNaam, setSearchNaam] = useState("");

    useEffect(() => {
        Axios.get("https://localhost:7260/api/Voorstelling").then((res) => {
            setPost(res.data);
            console.log(res.data);
        });
        //api("Voorstelling")
    }, []);

    return (
        <div className="Voorstelling">
            <div>
                <input
                    type={"text"}
                    placeholder={"voor naam van voorstelling in..."}
                    onChange={(e) => setSearchNaam(e.target.value)}
                />
            </div>
            {post.filter((value) => {
                if (searchNaam === "") {
                    return value;
                } else if (value.name.toLowerCase().includes(searchNaam.toLowerCase())) {
                    return value
                }
            }).map(item => (
                <div className="row row-cols-1 row-cols-md-2 g-4">

                    <div className="col">
                        <div className="card">
                            <h5 className="card-title" key={item.Id}>{item.name}</h5>
                            <img src={item.img} className="card-img-top" alt="..." />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <p className="card-text">
                                {item.beschrijving}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Voorstelling;