import { useContext } from 'react';
import { FaBars, FaCalendarAlt, FaHome, FaShoppingCart, FaWallet, FaRegArrowAltCircleRight, FaUtensils,FaBook, FaUsers } from 'react-icons/fa';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart([]);
    // console.log(cart);
    const [isAdmin] = useAdmin();
    // console.log(isAdmin);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-white">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open Menu
                </label>
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#D1A054] text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    {user && <div className='text-center p-2'>
                        <img title={user.displayName} className='mx-auto h-24 w-24 rounded-full' src={`${user.photoURL}`} alt={user.name} />
                        <h4 className='text-xl font-bold'>{user?.displayName}</h4>
                        <p>{user?.email}</p>
                    </div>}

                    {isAdmin ? <>
                        <li><NavLink to='/dashboard/admin-home'><FaHome /> Admin Home</NavLink> </li>
                        <li><NavLink to='/'><FaCalendarAlt /> Reservation</NavLink> </li>
                        <li><NavLink to='/dashboard/add-item'><FaUtensils /> Add Items</NavLink> </li>
                        <li><NavLink to='/dashboard/manage-items'><FaBars /> Manage Items</NavLink> </li>
                        <li><NavLink to='/dashboard/manage-bookings'><FaBook /> Manage Bookings</NavLink> </li>
                        <li><NavLink to='/dashboard/users'><FaUsers /> Manage Users</NavLink> </li>
                    </> : <>
                        <li><NavLink to='/dashboard/user-home'><FaHome /> User Home</NavLink> </li>
                        <li><NavLink to='/'><FaCalendarAlt /> Reservation</NavLink> </li>
                        <li><NavLink to='/'><FaWallet /> Payment History</NavLink> </li>
                        <li><NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart <div className="badge badge-secondary">+{cart?.length || 0}</div></NavLink> </li>
                    </>}
                    <div className="divider"></div>
                    <li><Link to='/'><FaHome />  Home</Link></li>
                    <li><Link to='/menu'><FaBars /> Our Menu</Link></li>
                    <li><Link to='/order/dessert'><FaShoppingCart /> Shopping</Link></li>
                    {
                        user ? <>
                            <li><button onClick={handleLogOut}><FaRegArrowAltCircleRight /> Logout</button></li>
                        </> :
                            <><li><Link to='/login'>Login</Link></li></>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;