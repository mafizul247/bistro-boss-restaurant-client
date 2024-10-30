import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        console.log(user);
        Swal.fire({
            title: "Are you sure make admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updateRole = { role: "admin" }
                fetch(`http://localhost:5000/users/admin/${user?._id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(updateRole)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            console.log(data)
                            refetch();
                            toast.success(`${user.email} is now admin`)
                        }
                    })
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || All Users</title>
            </Helmet>
            <div className="mb-4">
                <SectionTitle subHeading={'How Many?'} heading={'Manage Users'} />
            </div>
            <div className='bg-white p-4 '>
                <h3 className='text-xl font-bold'>Total users: {users?.length}</h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th># </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.map((user, index) => <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex users-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoURL}
                                                        alt={user?.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role === "admin" ? <button className="btn btn-success">Admin</button> :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-500 ">{user?.role == 'user' && 'User'} </button>
                                    }</td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn bg-red-500 "><FaTrashAlt className='text-xl text-white' /> </button>
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

export default Users;