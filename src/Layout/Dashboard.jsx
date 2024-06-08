import React from 'react';
import { FaAward, FaBars, FaCalendarAlt, FaCalendarDay, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { FaSpoon } from 'react-icons/fa6';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Dashboard = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const [cart] = useCart();
    const isAdmin = true;
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin ? <>
                            <li><NavLink to='/'><FaHome /> Admin Home</NavLink> </li>
                            <li><NavLink to='/'><FaUtensils /> Add Items</NavLink> </li>
                            <li><NavLink to='/'><FaList /> Manage Items</NavLink> </li>
                            <li><NavLink to='/dashboard/all-users'><FaUsers /> All Users</NavLink> </li>
                        </> : <>
                            <li><NavLink to='/'><FaHome /> User Home</NavLink> </li>
                            <li><NavLink to='/'><FaCalendarAlt /> Reservation</NavLink> </li>
                            <li><NavLink to='/'><FaWallet /> Payment History</NavLink> </li>
                            <li><NavLink to='/dashboard/myCart'><FaShoppingCart /> My Cart <span className='badge badge-secondary'> +{cart?.length || 0}</span> </NavLink> </li>
                            <li><NavLink to='/'><FaAward /> Add Review </NavLink> </li>
                            <li><NavLink to='/'><FaCalendarDay /> My Booking </NavLink> </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><Link to='/'><FaHome />Home</Link> </li>
                    <li><Link to='/menu'><FaBars />Our Menu</Link> </li>
                    <li><Link to='/order/salad'><FaShoppingCart />Order Food</Link> </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;