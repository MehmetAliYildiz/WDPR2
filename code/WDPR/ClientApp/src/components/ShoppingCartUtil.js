import React from 'react';

export function addToCartDetail(k, d, p, v) {
    console.log(k + " " + d + " " + p + " " + v);
    let cart = JSON.parse(localStorage.getItem("shoppingCart"));
    let content = {
        id: cart == null ? 0 : cart.length,
        key: k,
        cachedPrice: p,
        value: v
    };

    if (d !== null) content.details = d;

    if (cart == null) cart = [content];
    else cart.push(content);

    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    return content.id;
}

export function addToCart(k, p, v) {
    return addToCartDetail(k, null, p, v);
}

export function getFromCart(id) {
    let result;
    const cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart == null) return null;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            result = cart[i];
        }
    }

    return result;
}

export function removeFromCart(id) {
    const cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart == null) return null;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
            break;
        }
    }

    if (cart.length < 1) {
        localStorage.removeItem("shoppingCart");
        return;
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

export function getCart() {
    return JSON.parse(localStorage.getItem("shoppingCart"));
}

export function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart == null) return 0.0;

    return cart.reduce((partialSum, item) => partialSum + parseFloat(item.cachedPrice), 0).toFixed(2); // lambda om de som van alle kosten te berekenen
}

