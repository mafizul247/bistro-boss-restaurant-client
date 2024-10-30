import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import slide1 from './../../../assets/home/slide1.jpg'
import slide2 from './../../../assets/home/slide2.jpg'
import slide3 from './../../../assets/home/slide3.jpg'
import slide4 from './../../../assets/home/slide4.jpg'
import slide5 from './../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Category = () => {
    return (
        <div className='py-8'>
            <SectionTitle heading={'Order Online'} subHeading={'From 11:00am to 10:00pm'} />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="Banner" />
                    <h3 className='text-2xl font-semibold uppercase text-center -mt-12 text-white'>Salad</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="Banner" />
                    <h3 className='text-2xl font-semibold uppercase text-center -mt-12 text-white'>Soup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="Banner" />
                    <h3 className='text-2xl font-semibold uppercase text-center -mt-12 text-white'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="Banner" />
                    <h3 className='text-2xl font-semibold uppercase text-center -mt-12 text-white'>Dessert</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="Banner" />
                    <h3 className='text-2xl font-semibold uppercase text-center -mt-12 text-white'>Salad</h3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;