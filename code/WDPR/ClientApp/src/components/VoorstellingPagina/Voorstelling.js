import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Voorstelling.css";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar"
import GetEndpoint from "../Admin/EndPointUtil";
function Voorstelling() {

    const [post, setPost] = useState([]);
    const [searchNaam, setSearchNaam] = useState("");
    const [bands, setBands] = useState([]);



    useEffect(() => {
        Axios.get(GetEndpoint()+"api/Voorstelling").then((res) => {

            setPost(res.data);
            console.log(res.data);
        });
        //api("Voorstelling")
    }, []);

    useEffect(() => {
        async function fetchData() {
          const res = await Axios.get(GetEndpoint()+"api/band");
          setBands(res.data);
          console.log(res.data)
        }
        fetchData();
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
                                <img src={item.img} className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="col">
                            <div className="card-body">
                                <h5 className="card-title" key={item.Id}>{item.name}</h5>
                                <div className="Lijn"></div>
                                <p className="card-text">{item.beschrijving}</p>
                                <p className="card-text">Band: {bands.find(band => band.id === item.bandId)?.naam}</p>
                                <a href={`voorstelling/geselecteerd?itemId=${item.id}`} className="VoorstellingButton">Bekijk Voorstelling</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </>
    );;
}
export default Voorstelling;