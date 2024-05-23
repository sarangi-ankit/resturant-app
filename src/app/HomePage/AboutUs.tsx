"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Specialist from '../components/Specialist';

const AboutUs = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    {
      heading: "We have a proper passion for cooking, Love is the secret ingredient that makes all of us happy",
      author: "Ankit Sarangi",
      profession: "cook"
    },
    {
      heading: "From the delicious food to wonderful cocktail to satisfy all of your taste buds",
      author: "Tim David",
      profession: "cook"
    },
    {
      heading: "Experiment in the kitchen and focus on excellence are among our main driving forces in cooking",
      author: "Tim Paine",
      profession: "cook"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((currentText) => (currentText + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <p className="font-miniver mb-4 text-2xl text-center">Our Story</p>
      <h1 className="text-5xl font-subFont mb-4 lg:tracking-[12px] lg:text-6xl text-center">About Us</h1>
      <div className="mt-5 font-customFont max-w-lg text-center text-white tracking-wide">
        <p>
          We have been serving irresistible comfort food since 1999. Our mission is to keep you smiling with every bite.
        </p>
        <p className="mt-4">Treat yourself to a feel-good meal today!</p>
      </div>
      <div className="flex flex-wrap  justify-center mt-8 gap-4 md:gap-10">
        <img src="/images/about1.jpg" alt="About 1" className="w-full sm:w-1/3 h-auto sm:h-80 mx-2 mb-4" />
        <img src="/images/about1.jpg" alt="About 2" className="w-full sm:w-1/3 h-auto sm:h-80 mx-2 mb-4" />
        <img src="/images/about2.jpg" alt="About 3" className="w-full sm:w-1/3 h-auto sm:h-80 mx-2 mb-4" />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-8 bg-custom-background">
        <div className="flex-1 text-center lg:text-center p-4 md:p-8">
          <motion.div
            key={currentText}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-miniver text-3xl text-white mb-4">{texts[currentText].heading}</h2>
            <p className='font-buttonFont text-2xl mt-8 tracking-[3px]'>{texts[currentText].author}</p>
            <p className='text-white mt-2 text-xl'>{texts[currentText].profession}</p>
          </motion.div>
        </div>
        <div className="flex-1">
          <img src="/images/about4.jpg" alt="Example" className="w-full h-auto" />
        </div>
      </div>

      <div className="mt-8 w-full">
        <Specialist />
      </div>
    </div>
  );
}

export default AboutUs;
