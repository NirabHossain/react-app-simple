import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    console.log(loggedInUser);

    console.log(watch("example"));

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={loggedInUser.name?loggedInUser.name:loggedInUser.displayName} {...register("name", { required: true })} placeholder='Name'/>
            {errors.name && <span className='error'>Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Email' />
            {errors.email && <span className='error'>Email is required</span>}

            <input {...register("address", { required: true })}  placeholder='Address' />
            {errors.address && <span className='error'>Address is required</span>}

            <input {...register("phone", { required: true })} placeholder='Phone number'/>
            {errors.phone && <span className='error'>Phone number is required</span>}

            <input className='button' type="submit" />
        </form>
    );
};

export default Shipment;