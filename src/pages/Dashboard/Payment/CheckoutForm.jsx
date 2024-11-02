import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
// import useCart from '../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
// import './CheckoutForm.css'

const CheckoutForm = ({ cart, refetch, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    // const [cart, refetch] = useCart();
    const [axiosSecure] = useAxiosSecure();
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
        // console.log(price);
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        setErrorMessage('')
        setSuccess('')
        if (error) {
            // console.log(error.message)
            setErrorMessage(error.message)
        } else {
            // console.log('Card Payment', paymentMethod)
            // setSuccess(`${paymentMethod.id}`)
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            // console.log(confirmError);
            toast.error(`${confirmError.message}`);
        }
        setProcessing(false);
        // console.log('Payment Intent', paymentIntent);
        if (paymentIntent.status == 'succeeded') {
            const transactionId = paymentIntent.id;
            setSuccess(transactionId);
            toast.success(`Total pay USD ${parseFloat(paymentIntent.amount / 100)} successfully`);

            const payment = {
                email: user?.email,
                name: user?.displayName,
                transactionId,
                price: parseFloat(paymentIntent.amount / 100),
                quantity: cart?.length,
                cartItemId: cart?.map(item => item._id),
                menuItems: cart?.map(item => item.menuItemId),
                ItemName: cart?.map(item => item.name),
                date: new Date(),
                orderStatus: 'service pending'
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertResult.insertedId && res.data.deleteResult.deletedCount > 0) {
                        refetch();
                        navigate('/dashboard/mycart');
                        toast.success('Payment successfull')
                    }
                })
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-4 btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {errorMessage && <p className='text-red-600 py-4'>{errorMessage}</p>}
            {success && <p className='text-green-600 py-4'>Your payment succcessful and transaction id is: {success}</p>}
        </>
    );
};

export default CheckoutForm;