import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Stats from './Stats';
import BarChat from './BarChat';
// import PieChartQnt from './PieChartQnt';
import PieChartSimple from './PieChartSimple';

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

    const { data: chartData = [] } = useQuery({
        queryKey: ['bar-chart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data;
        }
    })

    return (
        <div className='p-8 bg-[#F6F6F6] min-h-[100vh]'>
            <h2 className='text-3xl font-bold my-6 text-green-600 text-center '>Hi, Welcome Back <span className='text-purple-600'>{user?.displayName}</span></h2>

            <Stats stats={stats} />
            {/* TODO Implement Chart & Bar  */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-6'>
                <BarChat chartData={chartData} />
                <PieChartSimple chartData={chartData}/>
                {/* <PieChartQnt chartData={chartData}/> */}
            </div>
        </div>
    );
};

export default AdminHome;