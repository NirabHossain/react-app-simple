import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price, 0);
    return (
        <div>
            <h4>This is a cart</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Total price: {total}</p>
            <button className='button' > <Link to={'/review'}>
                <FontAwesomeIcon icon={faShoppingBasket} /> Review Your Order
            </Link></button>
        </div>
    );
};

export default Cart;