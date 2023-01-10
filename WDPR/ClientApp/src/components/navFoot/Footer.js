import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js';
import './Footer.css';


function Footer(props) {

    return (
        <footer className="bg-light text-center text-lg-start">

            <div className="footer-container" style={props.style}>

    <div className="row justify-content-md-center">

      <div className="col-lg-3 col-md-6 mb-4 ">

        <ul className="list-unstyled ">
          <li>
            <a className="mb-0" href="/">
              <img src={"img/Logo_theater_laak_V2 (1).png"} style={{width: "128px", height: '128px'}}  alt="theater laak logo"/>
            </a>
          </li>
        
        </ul>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0">Navigatie</h5>

        <ul className="list-unstyled">
          <li>
            <a href="/Voorstelling" className="text-dark">Voorstelling</a>
          </li>
          <li>
            <a href="/doneren" className="text-dark">Doneren</a>
          </li>
          <li>
            <a href="/Tickets" className="text-dark">Tickets</a>
          </li>
        </ul>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Contact</h5>

        <ul className="list-unstyled mb-0">
          <li>
            Email: <a href="mailto:theaterLaak@laak.nl">theaterLaak@laak.nl</a>
          </li>
          <li>
            Telefoon: <a href="tel:+31629472972">+31629472972</a>
          </li>
          <li>
            Adress: <a href="https://goo.gl/maps/49t6NgaVVMZcbbZdA" className="text-dark">Ferrandweg 4-T, 2523 XT Den Haag</a>
          </li>
        </ul>
      </div>

      <div className="col-lg-auto col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0">Socials</h5>

        <ul className="list-unstyled">
          <li>
            <a href="" className="text-dark">Facebook</a>
          </li>
          <li>
            <a href="" className="text-dark">Instagram</a>
          </li>
          <li>
            <a href="" className="text-dark">Twitter</a>
          </li>
        </ul>
      </div>
     
    </div>
    
  </div>


</footer>
    );
}

export default Footer;