"use client"
import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CartContext } from "@/app/context/Context";

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


const CategoryList = () => {
    const context = useContext(CartContext);
    console.log("context", context)
    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state, dispatch } = context;
    // console.log(context.state)

    const [categoryItem, setCategoryItem] = useState<Category[]>(state.categories);
    const [menuItem, setMenuItem] = useState<Menus[]>(state.items);
    const [expandedDescriptions, setExpandedDescriptions] = useState<any>({});

    console.log("cat", categoryItem)
    console.log("menu", menuItem)



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

    useEffect(() => {
        setCategoryItem(state.categories);
        setMenuItem(state.items)
    }, [[state.categories, state.items]]);


    const getMenuItemsByCategory = (categoryId: any) => {
        return menuItem.filter(filteritem => filteritem.category === categoryId);
    };

    const isInCart = (itemId: string) => {
        return state.cart.some(item => item._id === itemId);
    };

    const addItemToCart = (item: any) => {
        dispatch({ type: "ADD_TO_CART", payload: { _id: item._id, name: item.name, image: item.image, quantity: 1, price: item.price } });
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
        <div className="mx-auto pt-14 px-4 lg:px-10 py-10">
            {categoryItem.map(category => (
                <div key={category._id} className="mb-8 mt-16">
                    <h1 className="text-customColor text-4xl text-center mb-12">{category.name}</h1>
                    <Slider {...settings}>
                        {getMenuItemsByCategory(category._id).map(item => (
                            <div key={item._id} className="px-2">
                                <div className="bg-custom-background rounded-lg shadow-md overflow-hidden h-full">
                                    <img src={item.image} alt={item.name} className="w-full h-80 object-cover" />
                                    <div className="p-4 h-full flex flex-col justify-between">
                                        <div className='text-white'>
                                            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                                            {item.description.length > 100 ?
                                                (expandedDescriptions[item._id] ?
                                                    <p className="text-white mb-2">{item.description}</p> :
                                                    <div className=''>
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
                                        <div>
                                            <div className="flex justify-between items-center my-4">
                                                <span className="">${item.price}</span>
                                                {
                                                    isInCart(item._id) ?
                                                        <button
                                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                                            onClick={() => removeCart(item._id)}>
                                                            Remove from Cart
                                                        </button>
                                                        :
                                                        <button
                                                            className="bg-customColor text-white px-4 py-2 rounded-md"
                                                            onClick={() => addItemToCart(item)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>



    );
};

export default CategoryList;
