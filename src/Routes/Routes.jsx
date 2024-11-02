import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Menu/Menu/Menu';
import Order from '../pages/Order/Order/Order';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import MyCart from '../pages/Dashboard/MyCart/MyCart';
import Users from '../pages/Dashboard/Users/Users';
import AddItem from '../pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import Payment from '../pages/Dashboard/Payment/Payment';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'menu',
                element: <Menu />
            },
            {
                path: 'order/:category',
                element: <Order />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <SignUp />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // User Route
            {
                path: 'mycart',
                element: <MyCart />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            // Admin User
            {
                path: 'users',
                element: <AdminRoute><Users /></AdminRoute>
            },
            {
                path: 'add-item',
                element: <AdminRoute><AddItem /></AdminRoute>
            },
            {
                path: 'manage-items',
                element: <AdminRoute><ManageItems /></AdminRoute>
            }
        ]
    }
]);

export default router;