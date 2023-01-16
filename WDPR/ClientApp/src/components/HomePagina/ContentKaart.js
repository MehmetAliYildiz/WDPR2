import './ContentKaart.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentKaart(props) {
    return (
        <div className='ContentKaart'>
            <div>
                <h2>{props.header}</h2>
                <img class="Icoon" src={props.icoon} alt={props.actie}></img>
                <p>{props.paragraph}</p>
            </div>
            <div>
                <Link to={props.link}>
                    <button className="button">{props.actie}</button>
                </Link>
            </div>
        </div >
    )
}