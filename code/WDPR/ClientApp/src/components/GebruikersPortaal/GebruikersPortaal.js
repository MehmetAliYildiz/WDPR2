// import React, {useState} from "react";
// import {FaRegCalendar} from 'react-icons/fa';
// import {IoPersonAdd} from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';


// function KaartjesCards() {
//     const [kaartjes, setKaartjes] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Get the email from the user's session
//         const email = sessionStorage.getItem("email");

//         // Fetch the kaartjes when the component mounts
//         fetch(`https://groep3theaterlaak.switzerlandnorth.cloudapp.azure.com/api/Account/kaartjeBIjGebruiker`, {
//             method: 'POST',
//             body: JSON.stringify({ email }),
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.error) {
//                     setError(data.error);
//                 } else {
//                     setKaartjes(data);
//                 }
//             })
//             .catch(err => setError(err.message));
//     }, []);

//     return (
//         <div className="container">
//             <h1 className="text-center my-5">Kaartjes</h1>
//             {error && <p className="text-danger">{error}</p>}
//             {kaartjes.length > 0 ? (
//                 <div className="card-columns">
//                     {kaartjes.map(kaartje => (
//                         <div key={kaartje.id} className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{kaartje.name}</h5>
//                                 <p className="card-text">
//                                     {kaartje.description}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center">Er zijn geen kaartjes gekoppeld aan je account</p>
//             )}
//         </div>
//     );
// }

// export default GebruikersPortaal;