import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonial from '../Testimonial/Testimonial';
import { Helmet } from 'react-helmet-async';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Home = () => {
    const navigation = useNavigation();

    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Bos || Home</title>
            </Helmet>
            <Banner />
            <Category />
            <PopularMenu />
            <Featured />
            <Testimonial />
        </div>
    );
};

export default Home;