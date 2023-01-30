import React, { useState, useEffect } from "react";
import GetEndpoint from "../Admin/EndPointUtil";
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";

function ArtiestBandPut() {
    const [bandId, setBandId] = useState("");
    const [artiestId, setArtiestId] = useState("");
    const [bands, setBands] = useState([]);
    const [artiesten, setArtiesten] = useState([]);
    const [artiestBand, setArtiestBand] = useState([]);
  
    useEffect(() => {
      const fetchArtiestBand = async () => {
        try {
          const response = await fetch(GetEndpoint()+"api/ArtiestBand");
          if (!response.ok) {
            throw new Error("Fetching ArtiestBand failed");
          }
          const data = await response.json();
          setArtiestBand(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchArtiestBand();
    }, []);
  
    useEffect(() => {
      const fetchBands = async () => {
        try {
          const response = await fetch(GetEndpoint()+"api/band");
          if (!response.ok) {
            throw new Error("Fetching bands failed");
          }
          const data = await response.json();
          setBands(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      const fetchArtiesten = async () => {
        try {
          const response = await fetch(GetEndpoint()+"api/artiest");
          if (!response.ok) {
            throw new Error("Fetching artiesten failed");
          }
          const data = await response.json();
          setArtiesten(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchBands();
      fetchArtiesten();
    }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(GetEndpoint()+`api/band/${bandId}/artist/${artiestId}`, {
          method: "PUT",
        });
        if (!response.ok) {
          throw new Error("Adding artist to band failed");
        }
        console.log("Artist added to band successfully");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
        <NavBar/>
        <h2>Create new ArtiestBand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bandId">Band ID:</label>
          <input
            type="text"
            id="bandId"
            value={bandId}
            onChange={(event) => setBandId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="artiestId">Artist ID:</label>
          <input
            type="text"
            id="artiestId"
            value={artiestId}
            onChange={(event) => setArtiestId(event.target.value)}
          />
        </div>
        <button type="submit">Add Artist to Band</button>
      </form>
      <h1 className={"title"}>Tabel Band</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Band ID</th>
            <th>Band Naam</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band.id}>
              <td>{band.id}</td>
              <td>{band.naam}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className={"title"}>Tabel Artiest</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Artiest ID</th>
            <th>Artiest Naam</th>
          </tr>
        </thead>
        <tbody>
          {artiesten.map((artiest) => (
            <tr key={artiest.id}>
              <td>{artiest.id}</td>
              <td>{artiest.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className={"title"}>Tabel ArtiestBand</h1>
        <table className="table">
        <thead>
            <tr>
            <th>Band ID</th>
            <th>Artiest ID</th>
            </tr>
        </thead>
        <tbody>
            {artiestBand.map((artiestBand) => (
            <tr key={artiestBand.BandId + artiestBand.ArtiestId}>
                <td>{artiestBand.bandId}</td>
                <td>{artiestBand.artiestId}</td>
            </tr>
            ))}
        </tbody>
        </table>
        <Footer/>
      </div>);
};
export default ArtiestBandPut;