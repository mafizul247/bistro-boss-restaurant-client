import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const useMenu = () => {
    const {data: menu, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/menu');
            return res.json();
        }
    })
    /* const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true); */

    /* useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            })
    }, [setLoading]) */

    return [menu, refetch];
};

export default useMenu;