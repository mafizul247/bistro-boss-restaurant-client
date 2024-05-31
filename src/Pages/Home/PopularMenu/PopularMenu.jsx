import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItems from '../../../Shared/MenuItems/MenuItems';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../../Menu/MenuCategory/MenuCategory';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu?.filter(item => item.category === 'popular');
    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems);
    //         })
    // }, [])

    return (
        <div className='px-24 py-8'>
            <SectionTitle heading={'From Our Menue'} subHeading={'Check It Out'} />
            <MenuCategory items={popular} />
            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    popular?.map(item => <MenuItems key={item._id} item={item} />)
                }
            </div> */}
            <div className='text-center mt-6'>
                <button className='btn btn-outline border-0 border-b-4 '>View Our Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;