import React, { useState } from 'react';
import queryString from 'query-string';

function PaymentForm() {
    const [formData, setFormData] = useState({ amount: '', reference: '1', url: 'https://localhost:44469/pay' });

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: queryString.stringify(formData),
        };
        fetch('https://fakepay.azurewebsites.net/', options)
            .then(response => {
                if (response.ok) {
                    console.log(queryString.stringify(formData))
                    // window.location.href = 'https://fakepay.azurewebsites.net/';
                } else {
                    console.log('Error:', response.statusText);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Amount:
                <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PaymentForm;




























// import React, { useState } from 'react';
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
//                 if (response.ok) {
//                      window.location.href = 'https://fakepay.azurewebsites.net/';
//                 }
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     // const handleCallback = async (reference) => {
//     //     try {
//     //         // Send POST request to callback URL
//     //         await axios.post(url, {
//     //             success,
//     //             reference,
//     //         });
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };
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
//             {success}
//         </div>
//     );
// };
//
// export default PaymentForm;





































