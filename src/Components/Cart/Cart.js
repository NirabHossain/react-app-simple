import React from 'react';

const Cart = (props) => {
    const cart=props.cart;
    const total= cart.reduce((total,prd)=>total+prd.price,0);
    console.log(cart);
    return (
        <div>
            <h4>This is a cart</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Total price: {total}</p>
        </div>
    );
};

export default Cart;