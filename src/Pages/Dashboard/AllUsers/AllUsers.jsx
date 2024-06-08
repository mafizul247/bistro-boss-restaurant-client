import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaEdit, FaTrashAlt, FaUserTie, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            return res.json();
        }
    })

    const handleUpdateuser = (user) => {
        fetch(`http://localhost:5000/user/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0) {
                refetch();
                toast(`${user.name} is now Admin`);
            }
        })
    }
    
    return (
        <div className='admin-container'>
            <Helmet>
                <title>Dashboard || All Users</title>
            </Helmet>
            <SectionTitle heading={'Manage users'} subHeading={'How many'} />
            <div className='bg-white py-4 px-6 rounded' >
                <div className="mb-6">
                    <h3 className='text-xl font-bold'>Total Items: {users?.length}</h3>
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
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    users?.map((user, index) => <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt={user.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role ? <FaUserTie className='w-6 h-6' /> : <FaUser className='w-6 h-6' />}</td>
                                        <td><button onClick={() => handleUpdateuser(user)} className='btn btn-secondary'><FaEdit className='text-xl text-white' /></button> </td>
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

export default AllUsers;