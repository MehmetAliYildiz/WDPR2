import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";
import GetEndpoint from "../Admin/EndPointUtil";

function BandPost() {
  const [bandName, setBandName] = useState("");
  const [bands, setBands] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    getBands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(GetEndpoint()+"api/band", {
        Naam: bandName,
      });
      if (res.status === 201) {
        setPostSuccess(true);
        setPostError(false);
        setTimeout(() => setPostSuccess(false), 3000);
        getBands();
      }
    } catch (error) {
      setPostError(true);
      setPostSuccess(false);
      setTimeout(() => setPostError(false), 3000);
    }
  };

  const getBands = async () => {
    try {
      const res = await axios.get(GetEndpoint()+"api/band");
      setBands(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <NavBar/>
      <form onSubmit={handleSubmit}>
        <label>
          Band Name:
          <input className="form-control" type="text" value={bandName} onChange={(e) => setBandName(e.target.value)}
          />
        </label>
        <button type="submit">Band aanmaken</button>
      </form>
      {postSuccess && <p>Band added successfully!</p>}
      {postError && <p>Error adding band. Please try again.</p>}
      <h1 className={"title"}>Alle Bands</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band.Id}>
              <td>{band.id}</td>
              <td>{band.naam}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
}

export default BandPost;
