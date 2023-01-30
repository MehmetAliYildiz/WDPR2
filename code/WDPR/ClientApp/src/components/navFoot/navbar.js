import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import { getAmountFromCart } from '../Payment/ShoppingCartUtil';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js';
import './Navbar.css'
import jwt_decode from 'jwt-decode';
import shoppingCart from '../../assets/payment/shopping_cart.png'

function Navigatie() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    var gebruikersnaam = sessionStorage.getItem('gebruikersNaam')
    var opgeslagen = sessionStorage.getItem('opgeslagen')



    useEffect(() => {
      async function checkLoggin(){
      var gebruikersnaam = sessionStorage.getItem('gebruikersNaam');
      var opgeslagen = sessionStorage.getItem('opgeslagen');
      
      if(opgeslagen) {
        if(!gebruikersnaam) {
          gebruikersnaam = sessionStorage.setItem('gebruikersNaam', opgeslagen)
          const decoded = jwt_decode(opgeslagen);
          // gebruikernaam uit de jwt token gehaald en nu plaatsen in localstorage
          const mail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          sessionStorage.setItem('gebruikersNaam',mail );
        }
      }
      if(gebruikersnaam) {
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
    }
    checkLoggin();
    },[]);
    
    const handleLogout = () => {
      if(opgeslagen){
        alert('if heeft er voor gekozen om herinnert te worden, verwijder uw cookies om opnieuw in te loggen');
        navigate('/');
      }
      else{
          sessionStorage.clear();
          localStorage.removeItem("shoppingCart");
        setIsLoggedIn(false);
        navigate('/');
      }
      

      // alert('U bent uigelogd!');
      
    };

    const getCart = () => {
        console.log(getAmountFromCart());
        return (
            <li>
                <a className="cart-link" href="/winkelmandje">
                    <button className="cart-knop">
                        <img height="36px" src={shoppingCart} />
                    </button>
                    {getAmountDetail()}
                </a>
            </li>
        );
    }

    const getAmountDetail = () => {
        return getAmountFromCart() > 0 ? (
            <div className="cart-amount">
                <p>
                    {getAmountFromCart()}
                </p>
            </div>
        ) : ("");
    }
    
    return (
        <>
        <nav className="navbar navbar-expand-lg site-navigation navKleur">


          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <a className="mb-0" href="/">
                  <img src={"img/Logo_theater_laak_V2 (1).png"} style={{width: "128px", height: '128px'}}  alt="theater laak logo"/>
                </a>
              </div>
              <div className="col-6">
                
              </div>

            </div>
            <button className="navbar-toggler uitklapper" type="button" data-toggle="collapse" data-target="#navbarKlap" aria-controls="navbarText" aria-expanded="false" aria-label="navigatie schakelaar">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse col-xl-1 " id={"navbarKlap"}>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{}}>
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Voorstelling">Voorstelling</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doneren">Doneren</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/reserveren">Zaal huren</a>
                            </li>
                {getCart()}
                
                {isLoggedIn ? 
                  
                <><li className="nav-item">
                    <div className="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome {gebruikersnaam}</div>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/gebruikerPortaal">Tickets</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="btn koop nav-link" onClick={handleLogout} >uitloggen</a>
                  </li>
                  {/* <li className="nav-item">
                      <a className="btn koop nav-link" href="/winkelmand">winkelmand</a>
                  </li> */}
                </>
                
                 : 
                <li className="nav-item">
                  <a className="btn koop" href="/inloggen">Inloggen</a>
                </li>
                
                }


              </ul>
              </div>
                
            </div>



          
        </nav>
      </>
    );
}

export default Navigatie;