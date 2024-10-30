import React from 'react';
import './Featured.css'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import featuredImg from './../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className='featured-img bg-fixed pt-8 my-12 text-white'>
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'Check it out'} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-24 pt-8 pb-16 justify-center items-center'>
                <img src={featuredImg} alt="Featured Image" />
                <div className='space-y-2 text-white'>
                    <p className='font-semibold'>March 20, 2023</p>
                    <h4 className='font-semibold uppercase'>WHERE CAN I GET SOME?</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quaerat blanditiis possimus error, labore commodi magnam est veritatis itaque voluptas dolore soluta, expedita quo quasi nostrum veniam odio sapiente fuga adipisci! Voluptatum, harum minima! Soluta velit ullam culpa sit fugiat, perferendis odio atque beatae dicta praesentium nobis est maxime totam.</p>
                    <button className='btn btn-outline text-white border-0 border-b-4 '>Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;