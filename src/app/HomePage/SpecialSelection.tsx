"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/Context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Menus {
    _id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    description: string;
}

const SpecialSelection = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state } = context;
    const [menuItems, setMenuItems] = useState<Menus[]>(state.items);
    const [visibleItems, setVisibleItems] = useState<number>(10);

    useEffect(() => {
        setMenuItems(state.items);
    }, [state.items]);

    const loadMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };

    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
        tap: { scale: 0.95, transition: { type: 'spring', stiffness: 300 } },
    };

    return (
        <div  className='bg-custom-background p-8 lg:p-16'>
            <div className='mb-20'>
                <p className="font-miniver mb-4 text-2xl text-center">Special Selection</p>
                <h1 className="text-3xl font-subFont mb-4 tracking-widest lg:text-6xl text-center uppercase">From Our Menu</h1>
            </div>

            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {menuItems.slice(0, visibleItems).map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={itemVariants}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    >
                        <ul>
                            <li className="mb-8">
                                <div className="flex justify-between mb-3">
                                    <p className="font-menuFont text-lg tracking-widest">{item.name}{" "}
                                        <span>-----------------------</span>
                                    </p>
                                    <p className="font-menuFont text-lg text-white">{item.price}.00</p>
                                </div>
                                <p className="text-white text-lg font-customFont">{item.description}</p>
                            </li>
                        </ul>
                    </motion.div>
                ))}
            </div>
            {visibleItems < menuItems.length && (
                <div className="flex justify-center mt-10">
                    <motion.button
                        onClick={loadMoreItems}
                        className="font-buttonFont tracking-widest bg-transparent border border-customColor text-white py-4 px-12 rounded hover:bg-secondaryColor"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Load More
                    </motion.button>
                </div>
            )}
        </div>
    );
}

export default SpecialSelection;
