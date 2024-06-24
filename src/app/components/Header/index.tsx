"use client"
import { CartContext } from '@/app/context/Context';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import FlyoutLink from '../layout/FlyoutLink';
import FlyoutUserContent from '../layout/FlyoutUserContent';
import FlyoutCartContent from '../layout/FlyoutCartContent';


const Header = () => {
    const route = useRouter()
    const { data: session } = useSession()
    console.log("session", session)

    const context = useContext(CartContext);
    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    
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

    const calculateTotalQuantity = () => {
        return context.state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    };

    
    // console.log("items", items)
    return (
        <nav className=" w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-white bg-custom-gradient lg:bg-custom-gradient lg:px-14">
            <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
                <Link href="/">
                    <img
                        src="/images/logo.png"
                        className='h-16 w-13'
                    />
                </Link>
                <div className="flex-1 flex justify-center">
                    <ul className="flex items-center gap-8 uppercase text-[14px]">
                        <li>
                            <Link href="/menu" className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondaryColor">
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondaryColor dark:text-white">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondaryColor dark:text-white">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondaryColor dark:text-white">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8 uppercase text-[14px]">
                        <li>
                            {session ? (
                                <FlyoutLink href="/cart" FlyoutContent={FlyoutCartContent}>
                                    <HiOutlineShoppingCart style={{ width: '24px', height: '24px' }} />
                                    <span className="bg-red-500 font-bold absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full leading-none">
                                        {calculateTotalQuantity()}
                                    </span>
                                </FlyoutLink>
                            ) : (
                                <Link href="/login">
                                    <HiOutlineShoppingCart style={{ width: '24px', height: '24px' }} />
                                </Link>
                            )}
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="text-white">
                                <CgProfile size={24} />
                            </div>
                            {session ? (
                                <FlyoutLink href="#" FlyoutContent={FlyoutUserContent}>
                                    Hi {session?.user?.name?.slice(0, 5)}...
                                </FlyoutLink>
                            ) : (
                                <Link href="/login" className="text-white">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Header;


