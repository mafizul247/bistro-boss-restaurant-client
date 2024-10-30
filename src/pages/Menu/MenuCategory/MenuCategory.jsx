import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ item, coverImg, title }) => {
    return (
        <div className='my-6'>
            <div className='mb-10'>
                {title && <Cover img={coverImg} title={title} />}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    item?.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <div className='text-center'>
                <Link to={`/order/${title ? title : 'offered'}`}>
                <button className='btn btn-outline border-0 border-b-4 '>Order Now</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;