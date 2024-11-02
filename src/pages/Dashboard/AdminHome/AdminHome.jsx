import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    })

    return (
        <div className='p-8 bg-[#F6F6F6] min-h-[100vh]'>
            <h2 className='text-3xl font-bold my-6 text-green-600 text-center'>Hi, Welcome Back <span className='text-purple-600'>{user?.displayName}</span></h2>

            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title font-bold">Revenue</div>
                    <div className="stat-value text-primary">${stats?.revenue}</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title font-bold">Customers</div>
                    <div className="stat-value text-secondary">{stats?.customers}</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-warning">
                    </div>
                    <div className="stat-title font-bold">Products</div>
                    <div className="stat-value text-warning">{stats?.products}</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title font-bold">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                </div>
            </div>
            {/* TODO Implement Chart & Bar  */}
        </div>
    );
};

export default AdminHome;