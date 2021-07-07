import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.quant, 0);
    let total=0;
    for(let i=0;i<cart.length;i++){
        const product=cart[i];
        total=total+product.price*product.quant;
    }
    return (
        <div>
            <h2>Order Summary: </h2>
            <p>Items ordered: {cart.length}</p>
            <p>Total price: {total}</p>
            {props.children}
        </div>
    );
};

export default Cart;