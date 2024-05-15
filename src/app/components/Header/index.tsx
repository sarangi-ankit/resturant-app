"use client"
import { CartContext } from '@/app/context/Context';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Header = () => {
    const route = useRouter()
    const context = useContext(CartContext);
    if (!context) {
    throw new Error("CartContext must be used within a CartProvider");
  }
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        if (response.ok) {
            alert("Logged out successfully");
            localStorage.setItem('isLoggedIn', 'false'); 
            setIsLoggedIn(false); 
            route.push("/login");
        } else {
            alert("Failed to logout");
        }
    };
    useEffect(() => {
        // Check login status from localStorage when the component mounts
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        // This will run every time `isLoggedIn` changes
        if (!isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'false');
            route.push("/login");
        } else {
            localStorage.setItem('isLoggedIn', 'true');
        }
    }, [isLoggedIn]);

    const handleSelectChange = (event: any) => {
        const selectedOption = event.target.value;
        switch (selectedOption) {
            case 'userProfile':
                route.push('/admin/userProfile');
                break;
            case 'category':
                route.push('/admin/category');
                break;
            case 'menu-items':
                route.push('/admin/menu-items');
                break;

            default:

                break;
        }
    };

     const calculateTotalQuantity = () => {
    return context.state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };
    return (
        <div className="w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-white  bg-custom-gradient lg:bg-custom-gradient">
            <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
                <Link href="/"><h1 className="text-2xl uppercase font-bold">Shoppers</h1></Link>
                <ul className="hidden lg:inline-flex items-center gap-8 uppercase text-[14px]">
                    <li>
                        <Link href="/menu" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Contact
                        </Link>
                    </li>

                    <li>
                        <Link href="/cart" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Cart[{calculateTotalQuantity()}]
                        </Link>
                    </li>
                    <li>
                        <select
                            name="Profile"
                            id="profile"
                            className='bg-transparent border-none focus:bg-blue-900 focus-within:bg:#154c79'
                            onChange={handleSelectChange}
                        >
                            <option value="Profile">Profile</option>
                            <option value="userProfile">user</option>
                            <option value="category">Category</option>
                            <option value="menu-items">Menu-items</option>

                        </select>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button
                                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" passHref className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
                <div className="hidden lg:inline-flex gap-8 items-center">
                    <button className="w-48 h-14 bg-white text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed hover:text-white duration-300">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;


