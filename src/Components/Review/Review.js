import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = (props) => {
    const [cart, setCart] = useState([]);
    const removeHandler= (product)=>{
        const newCart=cart.filter(pd=>product!==pd);
        setCart(newCart);
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        const cartProducts= productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quant=savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])
    return (
        <div>
            <h1>Cart Items: {cart.length}</h1>
            {
                cart.map(product=><ReviewItem product={product} key={product.key} removeHandler={removeHandler}></ReviewItem>)
            }
        </div>
    );
};

export default Review;