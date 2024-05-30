import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from './../../../assets/home/slide1.jpg'
import slide2 from './../../../assets/home/slide2.jpg'
import slide3 from './../../../assets/home/slide3.jpg'
import slide4 from './../../../assets/home/slide4.jpg'
import slide5 from './../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='px-24 pt-6 pb-10 w-full mx-auto'>
            <SectionTitle heading={'ORDER ONLINE'} subHeading={'From 10:00 am to 10:00 pm'} />
            <Swiper
                slidesPerView={4}
                spaceBetween={40}
                // centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="Slider" className='w-full' />
                    <h4 className='uppercase text-xl -mt-12 text-white text-center'>Salads</h4>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="Slider" className='w-full' />
                    <h4 className='uppercase text-xl -mt-12 text-white text-center'>Pizzas</h4>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="Slider" className='w-full' />
                    <h4 className='uppercase text-xl -mt-12 text-white text-center'>Soups</h4>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="Slider" className='w-full' />
                    <h4 className='uppercase text-xl -mt-12 text-white text-center'>Desserts</h4>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="Slider" className='w-full' />
                    <h4 className='uppercase text-xl -mt-12 text-white text-center'>Soups</h4>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;