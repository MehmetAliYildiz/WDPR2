import React, { useState } from 'react';

export default function PermissionPage() {
  const [token, setToken] = useState(null);
  var apiJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTc4MDcwYy1kYjk2LTQ2ZmItOWE4MC01MWM3ZjIwY2MzNTQiLCJqdGkiOiI5OWE4MTE0Ni1hMjg0LTQxNWEtYWQzZi04MzdlNWRjOTBmYmYiLCJpYXQiOiIwMS8yMS8yMDIzIDEyOjM5OjM3IiwiVXNlcklkIjoiN2U3ODA3MGMtZGI5Ni00NmZiLTlhODAtNTFjN2YyMGNjMzU0IiwiRW1haWwiOiJ2b2xlZ2E5NTU1QHRpbmduLmNvbSIsImV4cCI6MTk4OTkyMzk3NywiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.l_F5u_GOftaqRkp83saBVDCwdiCN1qlO1VFtLzd8Alo';
  const handlePermissionGrant = async () => {
    try {

      const currentUrl = window.location.href;
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTc4MDcwYy1kYjk2LTQ2ZmItOWE4MC01MWM3ZjIwY2MzNTQiLCJqdGkiOiI5OWE4MTE0Ni1hMjg0LTQxNWEtYWQzZi04MzdlNWRjOTBmYmYiLCJpYXQiOiIwMS8yMS8yMDIzIDEyOjM5OjM3IiwiVXNlcklkIjoiN2U3ODA3MGMtZGI5Ni00NmZiLTlhODAtNTFjN2YyMGNjMzU0IiwiRW1haWwiOiJ2b2xlZ2E5NTU1QHRpbmduLmNvbSIsImV4cCI6MTk4OTkyMzk3NywiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.l_F5u_GOftaqRkp83saBVDCwdiCN1qlO1VFtLzd8Alo';
      console.log('currenturl werkt')
      window.location.href = (`https://ikdoneer.azurewebsites.net/toegang?url=${currentUrl}`);

    } catch (error) {
      console.error(error);
    }
  };

  // if (token) {
  //   return <DonationsPage token={token} />;
  // }

  return (
    <div>
      
      {apiJWT ? <DonationsPage token={apiJWT} />: 
      <>
      <p>Voordat je donaties kunt doen, moet je toestemming geven.</p>
      <button onClick={handlePermissionGrant}>Geef toestemming</button>
      </>}
    </div>
    
  );
}

function DonationsPage({ token }) {
  const [donations, setDonations] = useState([]);

  const handleDonationsFetch = async () => {
    try {
      const response = await fetch('https://ikdoneer.azurewebsites.net/api/donaties', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      setDonations(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDonationsFetch}>Haal donaties op</button>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>{donation.amount}</li>
        ))}
      </ul>
    </div>
  );
}