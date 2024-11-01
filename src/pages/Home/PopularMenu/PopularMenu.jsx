// import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu([]);
    const popular = menu?.filter(item => item.category === 'popular');
    /* const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularMenu = data.filter(item => item.category === 'popular');
                setMenu(popularMenu);
            })
    }, []); */

    return (
        <div className='my-8'>
            <SectionTitle heading={'Popular Menu'} subHeading={'Check it out'} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    popular?.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default PopularMenu;