"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const route = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        if (response.ok) {
            alert("Logged out successfully");
            localStorage.setItem('isLoggedIn', 'false'); // Set isLoggedIn to false in localStorage
            setIsLoggedIn(false); // Update login status
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
    return (
        <div className="w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-black lg:text-white bg-white lg:bg-transparent">
            <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
                <h1 className="text-2xl uppercase font-bold">Shoppers</h1>
                <ul className="hidden text-white lg:inline-flex items-center gap-8 uppercase text-sm font-semibold">
                    <li>
                        <Link href="#" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
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
                        <Link href="#" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Cart
                        </Link>
                    </li>
                    <li>
                        <div className="relative">
                            <select
                                name="Profile"
                                id="profile"
                                className="appearance-none bg-transparent border-none text-white pl-3 pr-8 py-2 focus:outline-none focus:bg-blue-900 focus-within:bg-gray-700"
                                onChange={handleSelectChange}
                            >
                                <option value="Profile">Profile</option>
                                <option value="userProfile">user</option>
                                <option value="category">Category</option>
                                <option value="menu-items">Menu-items</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    />
                                </svg>
                            </div>
                        </div>
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


