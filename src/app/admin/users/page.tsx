"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import CustomSelect from "@/custom/CustomSelect";
import Link from "next/link";
import Header from "@/app/components/Header";
import ImagePreview from "@/app/components/layout/ImagePreview";
import CustomLoader from "@/app/components/layout/CustomLoader";


interface UserType {
    _id: string;
    email: string;
    name: string;
    admin: boolean;
};

export default function Users() {
    const [users, setUsers] = useState<UserType[]>([])
    const [loader, setLoader] = useState(true)

    const getUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            const userData = result.users;
            console.log("user", userData)
            setUsers(userData)
            setLoader(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CustomLoader />
            </div>
        );
    }

    return (
        <>

            <div className="h-screen relative overflow-x-auto shadow-md sm:rounded-lg bg-custom-gradient">
                <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 my-10 px-4 md:px-20">
                    <h2 className="text-secondaryColor text-3xl ">Users</h2>
                </div>

                <table className="w-full text-sm text-left text-white mx-10">
                    <thead className="text-xs text-white uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Admin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-700">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.admin ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button className="font-medium text-blue-500 hover:underline">Edit</button>
                                    <button
                                        type="submit"
                                        className="font-medium text-red-500 hover:underline"
                                    //   onClick={() => deleteCategory(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </>

    );
}
