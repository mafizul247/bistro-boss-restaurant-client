import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import FoodCard from '../../../components/FoodCard/FoodCard';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

// TO DO: Pagination Order Food Page

const OrderTab = ({ items }) => {
    const navigation = useNavigation();

    if(navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='my-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {
                            items?.map(item => <FoodCard key={item._id} item={item} />)
                        }
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default OrderTab;