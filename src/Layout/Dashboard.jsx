import React from 'react';
import { FaAward, FaBars, FaCalendarAlt, FaCalendarDay, FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
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
                    <li><NavLink to='/'><FaHome /> User Home</NavLink> </li>
                    <li><NavLink to='/'><FaCalendarAlt /> Reservation</NavLink> </li>
                    <li><NavLink to='/'><FaWallet /> Payment History</NavLink> </li>
                    <li><NavLink to='/dashboard/myCart'><FaShoppingCart /> My Cart </NavLink> </li>
                    <li><NavLink to='/'><FaAward /> Add Review </NavLink> </li>
                    <li><NavLink to='/'><FaCalendarDay /> My Booking </NavLink> </li>
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