"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/Context';

const CartPage = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state } = context;
    const [cartItems, setCartItems] = useState(state.cart);

    useEffect(() => {
        setCartItems(state.cart);
    }, [state.cart]);

    return (
        <div className="min-h-screen bg-gradient-to-b bg-custom-background flex justify-center items-center">
            <div className="max-w-3xl w-full p-4 bg-white rounded shadow-lg">
                <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                {cartItems.map(item => (
                    <div key={item._id} className="flex items-center border-b border-gray-200 py-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600">${item.price}</p>
                        </div>
                    </div>
                ))}
                {cartItems.length === 0 && <p className="text-center text-gray-500 mt-4">Your cart is empty</p>}
            </div>
        </div>
    );
}

export default CartPage;
