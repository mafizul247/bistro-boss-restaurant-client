import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/NavBar/NavBar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Main = () => {
    const navigation = useNavigation()
    // console.log(navigation.state);
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    // console.log(noHeaderFooter);

    return (
        <div>
            {noHeaderFooter || <NavBar />}
            <div className='min-h-[calc(100vh-5px)]'>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;