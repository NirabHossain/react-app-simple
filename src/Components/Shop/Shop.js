import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    // const [products, setProduct] = useState(first10);
    const products= first10;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey);
            product.quant = savedCart[pdKey];
            return product;
        })
        setCart(previousCart);
    }, [])
    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1, newCart;
        if (sameProduct) {
            count = sameProduct.quant + 1;
            sameProduct.quant = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else {
            product.quant = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {products.map(prod => <Product product={prod} showButton={true} handleAddProduct={handleAddProduct} key={prod.key}></Product>)}
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button className='button' > <Link to={'/review'}>
                        <FontAwesomeIcon icon={faShoppingBasket} /> Review Your Order
                    </Link></button>
                </Cart>
            </div>



        </div>
    );
};

export default Shop;

