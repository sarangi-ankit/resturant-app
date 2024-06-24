"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FlyoutUserContent = () => {

    const [isAdmin, setIsAdmin] = useState(false)

    const getUsers = async () => {
        try {
            const response = await fetch("/api/profile");
            const data = await response.json();
            // console.log("data",data)
            const adminData = data.admin
            // console.log("adminStatus",adminData)
            setIsAdmin(adminData)

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // console.log("admin", isAdmin);
    return (
        <div className="w-[13rem] bg-custom-gradient text-white p-6 shadow-xl">
            <div className="mb-3 space-y-3">

                <Link href="/admin/userProfile" className="block text-sm hover:underline">
                    Profile
                </Link>
                {isAdmin && (
                    <>
                        <Link href="/admin/category" className="block text-sm hover:underline">
                            Category
                        </Link>
                        <Link href="/admin/menu-items" className="block text-sm hover:underline">
                            Menu-Items
                        </Link>
                        <Link href="/admin/order" className="block text-sm hover:underline">
                            Orders
                        </Link>
                    </>

                )}
                <button
                    className="bg-customColor w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default FlyoutUserContent