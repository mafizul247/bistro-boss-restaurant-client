import React from 'react';
import usePayments from '../../../hooks/usePayments';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import moment from 'moment';

const ManageBookings = () => {
    const [payments] = usePayments();
    // console.log(payments)
    return (
        <div className='p-8'>
            <Helmet>
                <title>Bistro Boss || Manage Bookings</title>
            </Helmet>
            <SectionTitle subHeading={"Revew Bookings"} heading={'Manage Bookings'} />
            <div className='p-8 rounded-md bg-[#F6F6F6]'>
                <div className='uppercase'>
                    <h3 className='text-xl font-bold'>Total Bookings: {payments?.length}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th># </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Items</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments?.map((booking, index) => <tr key={booking._id}>
                                    <td>{index + 1}</td>
                                    <td>{booking?.name}</td>
                                    <td>{booking?.email}</td>
                                    <td>{booking?.price}</td>
                                    <td>{booking?.quantity}</td>
                                    <td>{moment(new Date(booking?.date)).format('LLL')}</td>
                                    <td>{booking?.orderStatus}</td>
                                    {/* <td>
                                            <button className="btn bg-yellow-600 "><Link to={`/dashboard/update-booking/${booking._id}`}>
                                            <FaEdit className='text-xl text-white' /> 
                                            </Link> </button>
                                        </td> */}
                                    {/* <td>
                                            <button onClick={() => handleDelete(booking)} className="btn bg-red-500 "><FaTrashAlt className='text-xl text-white' /> </button>
                                        </td> */}
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;