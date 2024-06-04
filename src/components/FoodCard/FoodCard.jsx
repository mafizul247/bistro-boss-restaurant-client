import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const { _id, name, recipe, image, price } = item;
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (item) => {
        const { name, recipe, image, price } = item;
        if (user && user?.email) {
            const AddItem = { menuItemId: _id, name, price, image, recipe, email: user.email };
            // console.log(AddItem);
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(AddItem)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        refetch();
                        console.log(data);
                        toast(`${name} has been add to cart`);
                    }
                })
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "Want to add this product",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Image" /></figure>
            <p className='px-4 py-2 absolute right-0 top-4 mr-4 rounded bg-slate-900 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 border-orange-500">Add To Cart <FaShoppingCart /> </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;