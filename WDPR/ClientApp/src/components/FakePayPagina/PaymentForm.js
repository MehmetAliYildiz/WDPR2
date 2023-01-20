import axios from 'axios';
import React, { Component } from "react";

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '',
            amount: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ amount: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            answer: 42,
            amount: this.state.amount,
            reference: 'Transaction001',
            url: 'https://localhost:44469/pay'
        };

        axios.post('https://fakepay.azurewebsites.net/', data)
            .then(response => {
                this.setState({ html: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Amount:
                    <input type="text" value={this.state.amount} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
            </form>
        );
    }
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
