import React from 'react';

const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Image" /></figure>
            <p className='px-4 py-2 absolute right-0 top-4 mr-4 rounded bg-slate-900 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-outline border-0 border-b-4 border-orange-500">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;