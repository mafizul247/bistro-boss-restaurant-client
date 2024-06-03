import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();

    const handleLogout = () => {
        logOut().then(() => { console.log('User Logout') }).catch(error => console.log(error.message))
    }

    const navOptions = <>
        <li><NavLink to='/' className={({ isActive }) => isActive && 'bg-orange-600'}>Home</NavLink></li>
        <li><NavLink to='/menu' className={({ isActive }) => isActive && 'bg-orange-600'}>Our Menu</NavLink></li>
        <li><NavLink to='/order/salad' className={({ isActive }) => isActive && 'bg-orange-600'}>Order Food</NavLink></li>
        <li><Link to='/private'>
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart?.length || 0}</div>
        </Link></li>
        {user ? <>
            <li><Link onClick={handleLogout} >LogOut</Link ></li>
            <img className='w-[40px] h-[40px] rounded-full' src={user?.photoURL} title={user?.displayName} alt={user?.displayName} />
        </> : <>
            <li><NavLink to='/login' className={({ isActive }) => isActive && 'bg-orange-600'}>Login</NavLink></li>
        </>}
    </>
    return (
        <>
            <div className="navbar fixed z-50 max-w-screen-2xl mx-auto bg-opacity-20 font-bold text-white bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
        </>
    );
};

export default NavBar;