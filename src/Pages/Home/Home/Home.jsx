import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonial from '../Testimonial/Testimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
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