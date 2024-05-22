"use client"
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const UserProfile = () => {
    const route = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleUpdate = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),

            });

            const data = await response.json();
            // console.log("data", data)

            if (response.ok) {
                alert(data.message);
                route.push("/");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }
    return (

        <>
            {/* <Header/> */}
            <div className="grid max-w-2xl mx-auto mt-8">
                <div className='w-full pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
                    <h2 className=" text-2xl font-bold sm:text-xl">Profile</h2>
                </div>

                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Bordered avatar" />

                    <div className="flex flex-col space-y-5 sm:ml-8">
                        <button type="button"
                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                            Change picture
                        </button>
                        <button type="button"
                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                            Delete picture
                        </button>
                    </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                    <div className="mb-2 sm:mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Input field for email */}
                    <div className="mb-2 sm:mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Input field for password */}
                    <div className="mb-2 sm:mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Input field for profession */}
                    <div className="mb-2 sm:mb-6">
                        <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Profession</label>
                        <input
                            type="text"
                            id="profession"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                            placeholder="Enter your profession"


                        />
                    </div>

                    {/* Input field for address */}
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Address</label>
                        <textarea
                            id="address"
                            className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Write your address here..."

                        ></textarea>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            onClick={handleUpdate}  // Added onClick handler
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>
        </>


    );
}

export default UserProfile