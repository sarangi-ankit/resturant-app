"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [menuItems, setMenuItems] = useState<Menus[]>([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState<any>({});



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

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/category');
            if (response.ok) {
                const data = await response.json();
                setCategories(data.category);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/menu-items');
            if (response.ok) {
                const data = await response.json();
                setMenuItems(data.menu);
            } else {
                console.error('Failed to fetch menu items');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchMenuItems();
    }, []);

    const getMenuItemsByCategory = (categoryId: any) => {
        return menuItems.filter(item => item.category === categoryId);
    };

    const toggleDescription = (itemId: any) => {
        setExpandedDescriptions((prevState: any) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    return (
        <div className="mx-auto pt-14 px-4 lg:px-10 py-10">
            {categories.map(category => (
                <div key={category._id} className="mb-8 mt-16">
                    <h1 className="text-customColor text-4xl text-center mb-12">{category.name}</h1>
                    <Slider {...settings}>
                        {getMenuItemsByCategory(category._id).map(menuItem => (
                            <div key={menuItem._id} className="px-2">
                                <div className="bg-custom-background rounded-lg shadow-md overflow-hidden h-full">
                                    <img src={menuItem.image} alt={menuItem.name} className="w-full h-80 object-cover" />
                                    <div className="p-4 h-full flex flex-col justify-between">
                                        <div className='text-white'>
                                            <h2 className="text-lg font-semibold mb-2">{menuItem.name}</h2>
                                            {menuItem.description.length > 100 ?
                                                (expandedDescriptions[menuItem._id] ?
                                                    <p className="text-white mb-2">{menuItem.description}</p> :
                                                    <div className=''>
                                                        <p className="mb-2">{menuItem.description.slice(0, 80)}
                                                            <span className='ml-2'>
                                                                <button
                                                                    className="text-customColor hover:underline text-sm"
                                                                    onClick={() => toggleDescription(menuItem._id)}
                                                                >
                                                                    {expandedDescriptions[menuItem._id] ? "Read Less" : "Read More"}
                                                                </button>
                                                            </span>
                                                        </p>
                                                    </div>
                                                ) :
                                                <p className=" mb-2 text-white">{menuItem.description}</p>
                                            }
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center my-4">
                                                <span className="">${menuItem.price}</span>
                                                <button className="bg-customColor text-white px-4 py-2 rounded-md">Add to Cart</button>
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
