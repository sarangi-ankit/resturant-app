import React, { useEffect, useState } from 'react';
import AnimatedText from '../components/animation/AnimatedText'; // Make sure the path is correct

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        '/images/slide3.jpg',
        '/images/mocktail.jpg',
        '/images/pizza1.jpg'
    ];
    const texts = [
        {
            description1:"welcome to our delicious corner",
            heading: "The Best Dishes",
            description2: "We have a proper passion for cooking, Love is the secret ingredient that makes all of us happy"
        },
        {
            description1:"take a sip of our innovative drink",
            heading: "The Finest Drink",
            description2: "From the delicious food to wonderful cocktail, TSB offer guaranteed satisfaction for all of your taste buds"
        },
        {
            description1:"The most delicious flavour combos",
            heading: "The Food Heaven",
            description2: "Experiment in the kitchen and focus on excellence are among our main driving forces in cooking"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage) => (currentImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-screen-2xl mx-auto">
            <img
                src={images[currentImage]}
                alt={`slide${currentImage + 1}`}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                
                <AnimatedText
                    text={texts[currentImage].description1}
                    className='font-miniver text-sm md:text-lg lg:text-xl mb-5 lg:mb-10'
                    />
                
                   <AnimatedText
                    text={texts[currentImage].heading}
                    className="font-metropolis text-center text-[40px] md:text-4xl lg:text-[73px] xl:text-[75px] mt-4 mb-4 tracking-widest lg:tracking-[25px]"
                /> 
            
                <AnimatedText 
                    text={texts[currentImage].description2}
                    className='font-customFont lg:mx-60 lg:mt-10 text-white text-xs md:text-base lg:text-lg xl:text-[20px] tracking-wider'
                />

                <button className=" mt-10 py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-12 bg-transparent border border-customColor text-white rounded transition hover:bg-white hover:text-black">
                    View More
                </button>
            </div>
        </div>
    );
};

export default Banner;
