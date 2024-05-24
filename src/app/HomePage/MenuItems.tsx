"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const MenuItems = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto mt-20 px-4 py-4 ">
      <p className='text-2xl text-center font-miniver mb-5'>tasty offers</p>
      <h1 className="font-subFont text-5xl font-bold text-center mb-8 uppercase tracking-[8px]">Our Menu</h1>
      <div ref={ref} className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 md:mx-20 my-20">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-md overflow-hidden bg-custom-background"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={itemVariants}
            transition={{ duration: 1, delay: index * 0.2 }}
            whileHover={{ scale: 1.08 }}
          >
            <img
              src={`/images/menu${item}.jpg`}
              alt={`Image ${item}`}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{`Title ${item}`}</h2>
              <p className="text-gray-700">Description of the item goes here.</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/menu">
          <button className="font-buttonFont bg-transparent border border-customColor text-white py-4 px-12 rounded hover:bg-white hover:text-black">
            View All
          </button>
        </Link>

      </div>
    </div>
  );
}

export default MenuItems;
