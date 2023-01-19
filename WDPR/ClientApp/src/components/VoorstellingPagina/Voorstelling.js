import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Voorstelling.css";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar"
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
        <>
            {/*<NavBar></NavBar>*/}
            <NavBar></NavBar>
            <div className="Voorstelling">
                <div className="Zoekveld">
                    <p>Zoek Naar Voorstelling</p>
                    <input className="input"
                           type={"text"}
                           placeholder={"Zoeken"}
                           onChange={(e) => setSearchNaam(e.target.value)}/>
                </div>
                {post.filter((value) => {
                    if (searchNaam === "") {
                        return value;
                    } else if (value.name.toLowerCase().includes(searchNaam.toLowerCase())) {
                        return value
                    }
                }).sort((a,b) => a.datum > b.datum ? 1 : -1).map(item => (
                    <div className="VoorstellingKaart">

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
                                <p>{item.datum}</p>
                                <a href={`voorstelling/geselecteerd?itemId=${item.id}`}>Button</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </>
    );
}
export default Voorstelling;