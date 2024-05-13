"use client"
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategoryList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="mx-auto py-14 px-4 lg:px-10 ">
            <div className="mb-8 mt-8">
                <h1 className="text-customColor text-4xl text-center mb-8">Starter</h1>
                <Slider {...settings}>
                    <div className='px-2'>
                        <img src="/images/menu1.jpg" alt="Image 1" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu2.jpg" alt="Image 2" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu3.jpg" alt="Image 3" className="w-full h-80 object-cover" />
                    </div>
                    {/* Add more image divs as needed */}
                </Slider>
            </div>
            <div className='mb-8 mt-8'>
                <h1 className='text-customColor text-4xl text-center mt-14 mb-8'>Main Course</h1>
                <Slider {...settings}>
                    <div className='px-2'>
                        <img src="/images/menu1.jpg" alt="Image 1" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu2.jpg" alt="Image 2" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu3.jpg" alt="Image 3" className="w-full h-80 object-cover" />
                    </div>
                    {/* Add more image divs as needed */}
                </Slider>
            </div>
            <div className='mb-8 mt-8'>
                <h1 className='text-customColor text-4xl text-center mt-14 mb-8'>Desert</h1>
                <Slider {...settings}>
                    <div className='px-2'>
                        <img src="/images/menu1.jpg" alt="Image 1" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu2.jpg" alt="Image 2" className="w-full h-80 object-cover" />
                    </div>
                    <div className='px-2'>
                        <img src="/images/menu3.jpg" alt="Image 3" className="w-full h-80 object-cover" />
                    </div>
                    {/* Add more image divs as needed */}
                </Slider>
            </div>



        </div>
    );
};

export default CategoryList;
