import React from 'react';

const ReviewItem = (props) => {
    const {name, quant}=props.product;
    const removeHandler = props.removeHandler;
    const style={
        borderBottom:'1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '220px'
    }
    return (
        <div>
            <div style={style}>
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quant}</p>
                <button className='button' onClick={()=>removeHandler(props.product)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;