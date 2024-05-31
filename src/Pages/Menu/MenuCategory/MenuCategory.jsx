import React from 'react';
import MenuItems from '../../../Shared/MenuItems/MenuItems';
import Cover from '../../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div>
            {title && <Cover img={img} title={title} />}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
                {
                    items?.map(item => <MenuItems key={item._id} item={item} />)
                }
            </div>
            { title &&
                <div className='mb-8 flex justify-center'>
                <Link to={`/order/${title}`}>
                    <button className='btn btn-outline border-0 border-b-4'>Order Now</button>
                </Link>
            </div>
            }
        </div>
    );
};

export default MenuCategory;