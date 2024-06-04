import React from 'react';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyCart = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const [cart, refetch] = useCart();
    const totalPrice = cart?.reduce((sum, item) => item.price + sum, 0);
    // console.log(cart[0]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            toast.error('Your item has been deleted');
                        }
                    })
            }
        });
    }

    return (
        <div className='admin-container'>
            <Helmet>
                <title>Dashboard || My Cart</title>
            </Helmet>
            <SectionTitle heading={'Add More Items'} subHeading={'My Cart'} />
            <div className='bg-white py-4 px-6 rounded' >
                <div className="flex justify-between items-center mb-6">
                    <h3 className='text-xl font-bold'>Total Items: {cart?.length}</h3>
                    <h3 className='text-xl font-bold'>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <button className='btn btn-warning btn-sm'>PAY</button>
                </div>
                <div className=''>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead >
                                <tr className='bg-orange-400 rounded-md font-bold'>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    cart?.map((item, index) => <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><button onClick={() => handleDelete(item._id)} className='btn btn-error'><FaTrashAlt className='text-xl text-white' /></button> </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;