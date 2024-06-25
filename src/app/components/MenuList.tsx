"use client"
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from "@/app/context/Context";
import { useSession } from 'next-auth/react';

interface Category {
    _id: string;
    name: string;
}

interface Menus {
    _id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    description: string;
}

const MenuList = ({ selectedCategory }: { selectedCategory: string }) => {
    const { data: session, status } = useSession();
  
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state, dispatch } = context;
    const [menuItem, setMenuItem] = useState<Menus[]>(state.items);
    const [expandedDescriptions, setExpandedDescriptions] = useState<any>({});

    useEffect(() => {
        setMenuItem(state.items);
    }, [state.items]);

    const getMenuItemsByCategory = (categoryId: string) => {
        if (!categoryId) {
            return menuItem;
        }
        return menuItem.filter(filteritem => filteritem.category === categoryId);
    };

    const isInCart = (itemId: string) => {
        return state.cart.some(item => item._id === itemId);
    };

    const addItemToCart = (item: any) => {
        dispatch({ type: "ADD_TO_CART", payload: { _id: item._id,name: item.name, image: item.image, quantity: 1, price: item.price } });
    };

    const removeCart = (itemid: any) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemid })
    }

    const toggleDescription = (itemId: any) => {
        setExpandedDescriptions((prevState: any) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    return (
        <div className="mx-auto pt-14 px-8 lg:px-16 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {getMenuItemsByCategory(selectedCategory).map(item => (
                    <div key={item._id} className="bg-custom-background rounded-lg shadow-md overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105">
                        <img src={item.image} alt={item.name} className="w-full h-48 sm:h-64 md:h-48 lg:h-64 object-cover" />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <div className='text-white'>
                                <h2 className="text-sm font-semibold mb-2">{item.name}</h2>
                                {item.description.length > 100 ?
                                    (expandedDescriptions[item._id] ?
                                        <p className="text-white mb-2">{item.description}</p> :
                                        <div>
                                            <p className="mb-2">{item.description.slice(0, 80)}
                                                <span className='ml-2'>
                                                    <button
                                                        className="text-customColor hover:underline text-sm"
                                                        onClick={() => toggleDescription(item._id)}
                                                    >
                                                        {expandedDescriptions[item._id] ? "Read Less" : "Read More"}
                                                    </button>
                                                </span>
                                            </p>
                                        </div>
                                    ) :
                                    <p className=" mb-2 text-white">{item.description}</p>
                                }
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center text-white">
                                    <span className="text-sm font-bold">${item.price}</span>
                                    {
                                        isInCart(item._id) ?
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md text-[11px]"
                                                onClick={() => removeCart(item._id)}>
                                                Remove from Cart
                                            </button>
                                            :
                                            <button
                                                className="bg-secondaryColor text-white px-4 py-2 rounded-md text-[11px]"
                                                onClick={() => addItemToCart(item)}
                                            >
                                                Add to Cart
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList;