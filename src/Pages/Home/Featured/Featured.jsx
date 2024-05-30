import React from 'react';
import featuredImg from './../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Featured.css'

const Featured = () => {
    return (
        <div className='px-24 py-8'>
            <div className="featured-image bg-fixed p-12 text-white ">
                <SectionTitle heading={'From Our Menu'} subHeading={'Check It Out'} />
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center  p-8'>
                    <div>
                        <img className='md:w-3/4 mx-auto' src={featuredImg} alt="Image" />
                    </div>
                    <div>
                        <p className='font-semibold'>June 01, 2024</p>
                        <h4 className='text-xl uppercase font-semibold'>WHERE CAN I GET SOME?</h4>
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, impedit. Veniam, quia. Obcaecati officiis quibusdam molestiae, maxime consectetur tempore aperiam dicta natus unde exercitationem, consequatur saepe amet provident vel! Voluptatem distinctio numquam tempora, sunt cupiditate explicabo eius beatae voluptatibus animi commodi nisi aliquam, repellat exercitationem non eligendi ad delectus magnam.</p>
                        <button className='btn btn-outline border-0 border-b-4 text-white'>Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;