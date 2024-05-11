import React, { useEffect, useState } from 'react'

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        '/images/slide3.jpg',
        '/images/mocktail.jpg',
        '/images/pizza1.jpg'
    ];
    const texts = [
        {
            heading: "The Best Dishes",
            description: "We have a proper passion for cooking, Love is the secret ingredient that makes all of us happy"
        },
        {
            heading: "The Finest Drink",
            description: "From the delicious food to wonderful cocktail to satisfy all of your taste buds"
        },
        {
            heading: "The Food Heaven",
            description: "Experiment in the kitchen and focus on excellence are among our main driving forces in cooking"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage: any) => (currentImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" max-w-screen-2xl mx-auto flex flex-col justify-center items-center">
            <img
                src={images[currentImage]}
                alt={`slide${currentImage + 1}`}
                className="w-full h-[600px] object-cover opacity-1"
            />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className=' text-[23px]'>The most delicious flavour combos</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">{texts[currentImage].heading}</h1>
                <p className='text-white text-[23px]'>{texts[currentImage].description}</p>
                <button className="bg-transparent border border-customColor mt-10 text-white py-4 px-12 rounded hover:bg-white hover:text-black">
                    View More
                </button>
            </div>
        </div>
    )
}

export default Banner