import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    const first10=fakeData.slice(0,10);
    console.log(first10);
    const[products,setProduct]=useState(first10);
    // setProduct([]);
    return (
        <div className='shop-container'>
            <div className="product-container">
                {products.map(prod=><Product product={prod}></Product>)}
            </div>
            
            <div className="cart-container">
                <h1>This is cart</h1>
            </div>
            


        </div>
    );
};

export default Shop;