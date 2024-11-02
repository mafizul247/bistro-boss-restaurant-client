import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div className='p-8 bg-[#F6F6F6] min-h-[100vh]'>
            <h2 className='text-3xl font-bold my-6 text-green-600 text-center'>Hi, Welcome Back <span className='text-purple-600'>{user?.displayName}</span></h2>
        </div>
    );
};

export default UserHome;