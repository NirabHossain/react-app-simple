import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Product = (props) => {
    const {img, name, seller, price, stock,star}=props.product;
    return (
        <div className="product">
            <div className='image-container'>
                <img src={img}></img>
            </div>
            <div className='information-container'>
                <h3 className='name'>{name}</h3>
                <p>by {seller}</p>
                <div className='info'>
                    <div>
                        <h3>${price}</h3>
                        <p>only {stock} left in stock - order soon</p>
                    </div>
                    <div>            
                        <p className='stars'>{star} stars</p>            
                        <h4>Features</h4>
                    </div>
                </div>
                <button className='button' onClick={()=>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;