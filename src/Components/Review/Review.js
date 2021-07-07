import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';

const Review = (props) => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,placeOrder]=useState(false);

    const placeOrderHandler =()=>{
        setCart([]);
        placeOrder(true);
        processOrder();
    }

    const removeHandler = (product) => {
        const newCart = cart.filter(pd => product !== pd);
        setCart(newCart);
        removeFromDatabaseCart(product.key);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quant = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const thankyou = <img src={happyImg} alt=''/>;
    return (
        <div className="shop-container">
            <div className='product-container'>
                {
                    cart.map(product => <ReviewItem product={product} key={product.key} removeHandler={removeHandler}></ReviewItem>)
                }
                {
                    orderPlaced && thankyou
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button className='button' onClick={()=>placeOrderHandler()}>Place your order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;