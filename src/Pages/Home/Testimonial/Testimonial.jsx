import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/reviews')
            .then(data => {
                setReviews(data.data)
                // console.log(data.data);
            })
    }, [])

    return (
        <div className='px-24 py-8'>
            <SectionTitle heading={'Testimonial'} subHeading={'What Our Clients Say'} />
            <div>
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        reviews?.map(review => <SwiperSlide key={review._id}>
                            <div className='px-12 py-8 text-center space-y-2 flex flex-col items-center'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p >{review.details}</p>
                                <h4 className='text-xl text-orange-500 uppercase'>{review.name}</h4>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;