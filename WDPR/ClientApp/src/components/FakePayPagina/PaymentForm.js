import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [account, setAccount] = useState('');
    const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        const isSuccess = account === "NL55ABNA5660751954" || (account === "NL02INGB8635612388" && Math.random() > 0.5);
        setSuccess(isSuccess);
        if(isSuccess)
            axios.post('/pay', {account: account, amount: amount}).then(response => console.log(response))
    }

    return (
        <>
            U moet <input type="number" value={amount} onChange={e => setAmount(e.target.value)}/> euro betalen.
            <br/>
            Het account NL55ABNA5660751954 heeft oneindig veel geld.
            <br/>
            Het account NL02INGB8635612388 heeft in 50% van de gevallen genoeg geld.
            <br/>
            Alle andere accounts hebben niet genoeg geld.
            <br/>
            <form method="post" action={`/pay/${amount}`} onSubmit={handleSubmit}>
                Bankrekeningnummer: <input name="account" id="account" value={account} onChange={e => setAccount(e.target.value)}></input>
                <input type="hidden" id="success" name="success" value={success}></input>
                <input type="hidden" name="reference" value="undefined"></input>
                <button type="submit">Betaal!</button>
            </form>
            {success ? <p>Success</p> : <p>Failure</p>}
        </>
    )
}

export default PaymentForm;

//import React, { useState } from 'react';
// import axios from 'axios';
//
// const PaymentForm = () => {
//     const [amount, setAmount] = useState('');
//     const [reference, setReference] = useState('');
//     const [url, setUrl] = useState('https://localhost:44469/pay');
//     // const [accountNumber, setAccountNumber] = useState('');
//     const [success, setSuccess] = useState(false);
//
//     const handlePayment = async () => {
//         try {
//             // Generate a unique reference
//             setReference(Math.random().toString(36).substring(2, 15));
//             setUrl('https://localhost:44469/pay');
//             // Send POST request to initiate payment
//             const response = await axios.post('https://fakepay.azurewebsites.net/', {
//                 amount,
//                 reference,
//                 url,
//             }).then(response => {
//                      console.log(response.data);
//             });
//
//             // Check for successful payment
//             if (response.data.success) {
//                 setSuccess(true);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const handleCallback = async (reference) => {
//         try {
//             // Send POST request to callback URL
//             await axios.post(url, {
//                 success,
//                 reference,
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />
//             {/*<input*/}
//             {/*    type="text"*/}
//             {/*    placeholder="Account Number"*/}
//             {/*    value={accountNumber}*/}
//             {/*    onChange={(e) => setAccountNumber(e.target.value)}*/}
//             {/*/>*/}
//             <button onClick={handlePayment}>Pay</button>
//             {success && handleCallback(reference)}
//         </div>
//     );
// };


// import React, { useState } from 'react';
// import queryString from 'query-string';
//
// function PaymentForm() {
//     const [formData, setFormData] = useState({ amount: '', reference: '1', url: 'https://localhost:44469/pay' });
//
//     const handleChange = event => {
//         setFormData({ ...formData, [event.target.name]: event.target.value });
//     };
//
//     const handleSubmit = event => {
//         event.preventDefault();
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: queryString.stringify(formData),
//         };
//         fetch('https://fakepay.azurewebsites.net/', options)
//             .then(response => {
//                 if (response.ok) {
//                     console.log(queryString.stringify(formData))
//                     // window.location.href = 'https://fakepay.azurewebsites.net/';
//                 } else {
//                     console.log('Error:', response.statusText);
//                 }
//             });
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Amount:
//                 <input
//                     type="text"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleChange}
//                 />
//             </label>
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
//
// export default PaymentForm;
