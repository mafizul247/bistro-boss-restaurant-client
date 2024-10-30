import React from 'react';

const MenuItem = ({ item }) => {
    const { _id, name, recipe, image, price } = item;
    return (
        <div className='flex gap-4 mb-4'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[100px]' src={image} alt="Image" />
            <div>
                <h4 className='text-xl uppercase'>{name}------------</h4>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500 font-semibold'>${price}</p>
        </div>
    );
};

export default MenuItem;