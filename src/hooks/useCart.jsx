import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.removeItem('access-token');

    const { isPending, isLoading: loading, refetch, isError, data: cart = [], error } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {headers: {
                authorization: `bearer ${token}`
            }});
            return response.json();
        },
    })

    return [cart, refetch];
};

export default useCart;