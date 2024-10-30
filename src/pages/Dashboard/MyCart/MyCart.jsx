import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyCart = () => {
    const [cart, refetch] = useCart([]);
    const total = cart?.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (item) => {
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
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            toast.success(`${item.name} delete successullfy`);
                        }
                    })
                /* Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                }); */
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || My Cart</title>
            </Helmet>
            <div className='mb-8'>
                <SectionTitle subHeading={'My Cart'} heading={'ADD MORE?'} />
            </div>
            <div className='bg-white py-4'>
                <div className='uppercase flex justify-around items-center mb-8'>
                    <h3 className='text-xl font-bold'>Total Order {cart?.length}</h3>
                    <h3 className='text-xl font-bold'>Total Price: {total}</h3>
                    <button className='btn bg-[#D1A054] text-white btn-sm'>PAY</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th># </th>
                                <th>Food</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart?.map((item, index) => <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item?.image}
                                                        alt={item?.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.name}</td>
                                    <td>{item?.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn bg-red-500 "><FaTrashAlt className='text-xl text-white' /> </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;