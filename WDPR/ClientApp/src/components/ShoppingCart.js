import React, { Component } from 'react';
import { getCart, removeFromCart } from './ShoppingCartUtil';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: getCart()
        };
    }

    removeId(id) {
        removeFromCart(id);
        this.setState({
            cart: getCart()
        });
    }

    render() {
        let cartList;
        if (this.state.cart !== null) {
            // Guard clause voor het geval de shopping cart leeg is maar niet null, wat eigenlijk niet zou moeten gebeuren
            if (this.state.cart.length < 1) {
                localStorage.removeItem("shoppingCart");
                this.setState({ cart: null });
            }

            // Lijst van items om te returnen
            cartList = (
                <div>
                    {this.state.cart.map(item => (
                        <div key={item.id}>
                            <h3>{item.key}, €{item.cachedPrice}</h3>
                            <p>{item.details}</p>
                            <button type="button" onClick={() => this.removeId(item.id)}>Weg ermee</button>
                        </div>
                    ))}
                </div>
            );
        } else {
            cartList = (<p>U heeft niks in uw winkelmandje staan</p>);
        }

        return (
            <div>
                {cartList}
                <a href="https://google.com/">
                    <button>
                        Klik hier om te betalen
                    </button>
                </a>
            </div>
        );
    }
}