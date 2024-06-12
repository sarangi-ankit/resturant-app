"use client"
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../context/Context';

interface CartItemType {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const OrderSuccessPage = () => {
    const router = useRouter();
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state, dispatch } = context;
    console.log("clear", state.cart)
    const [cartOrders, setCartOrders] = useState<CartItemType[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        // Store the current cart in local state
        setCartOrders(state.cart as CartItemType[]);

        // Calculate total price
        const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotal(totalPrice);

    }, [state.cart]);

    console.log("orders", cartOrders)
    let deliveryCharge = 5.00;
    const totalWithDelivery = (total + deliveryCharge).toFixed(2);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-custom-gradient py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-custom-background p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-extrabold text-white text-center">Order Successful</h2>
                <p className="mt-4 text-center text-customColor">Thank you for your purchase! Your order has been placed successfully.</p>
                <div className="mt-6">
                    <h3 className="text-2xl font-bold text-customColor mb-4">Your Orders</h3>
                    <ul className="space-y-6">
                        {cartOrders.length > 0 && cartOrders.map((item) => (
                            <li key={item._id} className="flex items-center justify-between bg-custom-gradient p-4 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                                    <div>
                                        <h4 className="font-medium text-customColor">{item.name}</h4>
                                        <p className="text-customColor">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-customColor">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 border-t border-gray-200 pt-4 text-white">
                        <div className="flex justify-between text-xl font-bold ">
                            <span>SubTotal:</span>
                            <span>{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold ">
                            <span>Delivery Charge:</span>
                            <span>{deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold ">
                            <span>Total:</span>
                            <span>{totalWithDelivery}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="w-full mt-6 py-2 px-4 bg-customColor text-white font-semibold rounded-lg shadow-md hover:bg-secondaryColor focus:outline-none"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
