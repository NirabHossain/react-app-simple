import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const viewProduct= fakeData.find(pd=>pd.key===productKey);
    return (
        <div>
            <h1>{viewProduct.name} Product Detail coming soon</h1>
            <Product showButton={false} product={viewProduct}></Product>
        </div>
    );
};

export default ProductDetail;