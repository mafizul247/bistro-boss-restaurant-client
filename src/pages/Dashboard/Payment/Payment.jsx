import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK);
// const stripePromise = loadStripe('pk_test_51NK25jBE9y9E9r8tMhn4oGgHbMTnkZdvRj328oymRfppbmkZjo7FhzDx6k1zaIaYfvlkli7GEVIb8LyHauDI7LiT0061qdNNBI');

const Payment = () => {
    const [cart, refetch] = useCart([]);
    const total = cart?.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    // console.log(price);
    /* const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{sk_test_51NK25jBE9y9E9r8t5naEfvPB5gFNpqGyeJBni9FAYNMVeTzsRNlSS3J19EwhLEoCcKmLgFcxd87FFdNs0xrFVV6p00XbsyUTHK}}',
    }; */

    return (
        <div className='p-8 bg-[#F6F6F6] min-h-[100vh]'>
            <Helmet>
                <title>Bistro Boss || My Cart</title>
            </Helmet>
            <div className='mb-8'>
                <SectionTitle subHeading={'Provide Money'} heading={'Payment'} />
            </div>
            <div className='bg-white p-6 rounded-md'>
                <h2 className='text-xl font-bold uppercase mb-4'>Pay Total Amount: <span className='text-orange-500'>${price}</span></h2>
                <Elements stripe={stripePromise} >
                    <CheckoutForm cart={cart} refetch={refetch} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;