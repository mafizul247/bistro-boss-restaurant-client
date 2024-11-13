import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleUpdate = (item) => {

    }

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
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.error(`${item.name} has been deleted successfully`);
                        }
                    })
            }
        });
    }

    return (
        <div >
            <div className='p-8 bg-[#F6F6F6] min-h-[100vh]'>
                <Helmet>
                    <title>Bistro Boss || Manage Items</title>
                </Helmet>
                <div className='mb-8'>
                    <SectionTitle subHeading={'Hurry Up'} heading={'Manage All Items'} />
                </div>
                <div className='bg-white p-4 rounded-md'>
                    <div className='uppercase'>
                        <h3 className='text-xl font-bold'>Total Items: {menu?.length}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th># </th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    menu?.map((item, index) => <tr key={item._id}>
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
                                            <button className="btn bg-yellow-600 "><Link to={`/dashboard/update-item/${item._id}`}>
                                            <FaEdit className='text-xl text-white' /> 
                                            </Link> </button>
                                        </td>
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
        </div>
    );
};

export default ManageItems;