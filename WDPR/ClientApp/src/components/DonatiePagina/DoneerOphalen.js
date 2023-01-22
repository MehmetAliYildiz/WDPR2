import React, { useState, useEffect } from 'react';
import DonatiePlaatsen from './DonatiePlaatsen';
import Footer from "../navFoot/Footer";
import NavBar from "../navFoot/navbar";

function Donations() {
  // const [donations, setDonations] = useState(null);
  // const [totaal, setTotaal] = useState();
  // const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTc4MDcwYy1kYjk2LTQ2ZmItOWE4MC01MWM3ZjIwY2MzNTQiLCJqdGkiOiIxYzZjNzIwMS1lNmU0LTQ0MzItODRmNS0yMWFhZTllY2U5MGUiLCJpYXQiOiIwMS8yMi8yMDIzIDEwOjQxOjQ5IiwiVXNlcklkIjoiN2U3ODA3MGMtZGI5Ni00NmZiLTlhODAtNTFjN2YyMGNjMzU0IiwiRW1haWwiOiJ2b2xlZ2E5NTU1QHRpbmduLmNvbSIsImV4cCI6MTk5MDAwMzMwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.mapxr6gQjgLHq161mVw1B69fV4orZgK-1lsd57AFBm8';

  // useEffect(() => {
  //   const getDonations = async () => {
  //     try {
  //       const options = {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ` + jwtToken,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //       const res = await fetch('https://ikdoneer.azurewebsites.net/api/donatie', options);
  //       const data = await res.json();
  //       setDonations(data);
  //       if(data) {
  //         let total = 0;
  //         data.forEach(donation => {
  //           total += donation.Hoeveelheid;
  //         });
  //         setTotaal(total);
  //         console.log(donations)
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getDonations();
  // }, []);

  return (
    <div>
      <NavBar/>
      <DonatiePlaatsen/>
      <Footer style={{ bottom: "0%", position: "fixed", width: "100vw" }} />
    </div>
    
  );
}

export default Donations;