import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const FlyoutUserContent = () => {
    return (
        <div className="w-[13rem] bg-custom-gradient text-white p-6 shadow-xl">
            <div className="mb-3 space-y-3">

                <Link href="/admin/userProfile" className="block text-sm hover:underline">
                    Profile
                </Link>
                <Link href="/admin/category" className="block text-sm hover:underline">
                    Category
                </Link>
                <Link href="/admin/menu-items" className="block text-sm hover:underline">
                    Menu-Items
                </Link>


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