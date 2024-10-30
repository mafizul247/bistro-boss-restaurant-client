import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='my-12'>
            <SectionTitle heading={'TESTIMONIALS'} subHeading={'What Our Clients Say'} />
            <div>
                <Swiper
                    navigation={true} autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper">
                    {reviews?.map(review => <SwiperSlide>
                        <div className='px-16 py-8 text-center space-y-3'>
                            <div className='flex justify-center'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                            </div>
                            <div className='flex justify-center'>
                                <FaQuoteLeft className='w-16 h-16' />
                            </div>
                            <p>{review.details}</p>
                            <h4 className='text-yellow-600 font-semibold text-2xl uppercase'>{review.name}</h4>
                        </div>
                    </SwiperSlide>)}

                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;