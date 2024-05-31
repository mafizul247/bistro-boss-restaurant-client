import React from 'react';

const MenuItems = ({item}) => {
    const {name, recipe, image, price} = item;
    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[100px]' src={image} alt={name} />
            <div>
                <h4 className='text-xl font-semibold'>{name}--------------</h4>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-600'>${price}</p>
        </div>
    );
};

export default MenuItems;