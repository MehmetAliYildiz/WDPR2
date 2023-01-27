import React, { useState } from 'react';
import axios from 'axios';

const NieuweReview = (props) => {
  const [review, setReview] = useState({
    gebruikerId: props.gebruikerId,
    voorstellingId: props.voorstellingId,
    recensie: "",
    sterren: 0
  });

  const handleChange = (event) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:7260/api/review', review)
      .then(res => {
        console.log(res.data);
        setReview({
          gebruikerId: props.gebruikerId,
          voorstellingId: props.voorstellingId,
          recensie: "",
          sterren: 0
        });
        alert("Your review has been posted!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recensie:
        <input type="text" name="recensie" value={review.recensie} onChange={handleChange} />
      </label>
      <br />
      <label>
        Sterren:
        <input type="number" name="sterren" min="0" max="5" value={review.sterren} onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Post Review" />
    </form>
  );
}

export default NieuweReview;
