import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { _id, name, recipe, image, price } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleADDToCart = (item) => {
        const { _id, name, recipe, image, price } = item;
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, recipe, image, price, email: user.email };

            fetch(`http://localhost:5000/carts`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.insertedId) {
                        refetch();
                        toast.success(`${name} add to cart`);
                    }
                })
        } else {
            Swal.fire({
                title: "Please login for order food!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location }, replace: true });
                }
            });
        }
    }

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Food" />
            </figure>
            <p className='absolute top-4 right-6 text-white font-semibold bg-slate-800 px-3 py-2 rounded'>${price}</p>
            <div className="card-body flex items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleADDToCart(item)} className="btn btn-outline bg-slate-200 border-0 border-b-4">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;