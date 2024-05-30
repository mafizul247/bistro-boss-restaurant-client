import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/NavBar/NavBar';

const Main = () => {
    return (
        <div>
            <NavBar />
            <div className='min-h-[calc(100vh-30px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;