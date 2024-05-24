import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import AnimatedText from './animation/AnimatedText';

const Specialist = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="flex flex-col lg:flex-row items-center justify-center gap-6 my-16 p-8 lg:p-8 lg:mt-24">
      <motion.div
        className="flex-1 lg:w-1/2"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={imageVariants}
        transition={{ duration: 2 }}
      >
        <img src="/images/about5.jpg" alt="Specialist" className="w-full h-auto lg:mx-auto lg:px-16" />
      </motion.div>
      <motion.div
        className="flex-1 lg:w-1/2 text-center lg:text-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={textVariants}
        transition={{ duration: 1 }}
      >
        <div className='p-8'>
          <AnimatedText
            text="Recommendation"
            className='font-miniver mb-4 text-2xl text-center'
          />
          <AnimatedText
            text="Our best Specialities"
            className='text-3xl font-subFont mb-4 tracking-widest lg:text-4xl text-center uppercase'
          />
          <AnimatedText
            text="Lorem ipsum dolor sit amet, consectet adipisicing eli sed do eiu smotem por incididunt ut abore et dolore magali qua. Ut enim ad minm eni amquis nostrud exercitation."
            className='mb-4 w-[400px] text-white'
          />
          <button className="bg-transparent border border-customColor mt-10 text-white py-4 px-12 rounded hover:bg-white hover:text-black">
            View More
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Specialist;
