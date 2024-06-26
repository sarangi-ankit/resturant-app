"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import CustomLoader from '@/app/components/layout/CustomLoader';


export type Item = {
    _id: string;
    name: string;
    price: number;
};

export type Order = {
    _id: string;
    userId: string;
    items: Item[];
    payment: boolean;
    amount: number;
};

const Order = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loader,setLoader]=useState<boolean>(true)


    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/checkout');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            console.log("result", result);
            setOrders(result.orders);
            setLoader(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
        
    }, []);
    
    if (loader) {
    return (
            <div className="flex justify-center items-center min-h-screen">
                <CustomLoader/>
            </div>
        );
    }
    
    return (
        <div className="h-screen relative overflow-x-auto shadow-md sm:rounded-lg bg-custom-gradient">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-4 my-10 px-4 md:px-20">
                <div className="text-secondaryColor text-3xl">
                    <h1>Orders</h1>
                </div>
            </div>
            <table className="w-full text-sm text-left text-white mx-10 border-collapse">
                <thead className="text-xs text-white uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 w-32">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Items
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <tr key={item._id} className="border-b border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 w-32">
                                {item.userId}
                            </td>
                            <td className="px-6 py-4 w-[240px]">
                                {item.items.map((it) => it.name).join(', ')}
                            </td>
                            <td className="px-6 py-4">
                                {item.amount}.00
                            </td>
                            <td className="px-6 py-4 flex ">
                                {item.payment ? (
                                    <button className="bg-green-600 text-white w-28 px-4 py-2 rounded">Paid</button>
                                ) : (
                                    <button className="bg-red-600 text-white w-28 px-4 py-2 rounded">Not Paid</button>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-transparent border text-white px-4 py-2 rounded-md hover:bg-secondaryColor">Show Order</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;
