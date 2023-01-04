import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Voorstelling.css";
import 'bootstrap/dist/css/bootstrap.css';
function Voorstelling() {

    const [post, setPost] = useState([]);
    const [searchNaam, setSearchNaam] = useState("");
    // const [img, setImg] = useState("");

    useEffect(() => {
        Axios.get("https://localhost:7260/api/Voorstelling").then((res) => {
            // setNaam(res.data[0].naam);
            // setImg(res.data.img);
            setPost(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <div className="Voorstelling">
            <div>
                <input
                    type={"tex"}
                    placeholder={"voor naam van voorstelling in..."}
                    onChange={(e) => setSearchNaam(e.target.value)}
                />
            </div>
            {post.filter((value) => {
                if (searchNaam === "") {
                    return value;
                } else if (value.naam.toLowerCase().includes(searchNaam.toLowerCase())) {
                    return value
                }
            }).map(item => (
                <div className="row row-cols-1 row-cols-md-2 g-4">

                    <div className="col">
                        <div className="card">
                            <h5 className="card-title" key={item.id}>{item.naam}</h5>
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
                // <div>
                //
                //     <div className={"container"}>
                //         <p id="page1" key={item.id}>{item.naam}</p>
                //         <img id="img" src={item.img} />
                //     </div>
                //     <div id="second">
                //         <div className={"container2"}>
                //         <p id={"page2"}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                //             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                //             when an unknown printer took a galley of type and scrambled it to make a type
                //             specimen book.</p>
                //         </div>
                //     </div>
                // </div>
            ))}
        </div>
    );
}
export default Voorstelling;