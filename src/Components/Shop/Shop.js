import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10=fakeData.slice(0,10);
    const[products,setProduct]=useState(first10);
    const[cart, setCart]=useState([]);
    
    const handleAddProduct = (product) =>{
        const newCart=[...cart,product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd=> pd.key===product.key);
        addToDatabaseCart(product.key,sameProduct.length);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {products.map(prod=><Product product={prod} showButton={true} handleAddProduct={handleAddProduct} key={prod.key}></Product>)}
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            


        </div>
    );
};

export default Shop;

