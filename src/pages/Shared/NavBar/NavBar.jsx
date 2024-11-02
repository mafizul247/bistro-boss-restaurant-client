import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart([]);
    const [isAdmin] = useAdmin();
    // console.log(user?.photoURL);

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success('Logout successfull'))
            .catch(error => toast.error(error.message));
    }

    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order/dessert'>Order Food</NavLink></li>
        <li><NavLink to={`${isAdmin ? '/dashboard/admin-home' : '/dashboard/user-home'}`}>Dashboard</NavLink></li>
        {
            user ? <>
                {!isAdmin && <li className='rounded-md bg-gray-700 ml-2'>
                    <Link to='/dashboard/mycart' >
                        <FaShoppingCart className='' />
                        <div className="badge badge-secondary">+{cart?.length || 0}</div>
                    </Link>
                </li>}
                {user.photoURL && <img title={user?.displayName} className='mx-2 h-10 w-10 rounded-full' src={user?.photoURL} alt={user?.name} />}
                <li><button onClick={handleLogOut}>Logout</button></li>
            </> :
                <><li><Link to='/login'>Login</Link></li></>
        }
    </>
    return (
        <div className="navbar bg-black bg-opacity-30 text-white fixed z-10 max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default NavBar;