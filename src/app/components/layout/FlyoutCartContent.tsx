"use client"
import { CartContext } from '@/app/context/Context';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

interface CartItemType {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const FlyoutCartContent = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state } = context;
    const [cartItems, setCartItems] = useState<CartItemType[]>(state.cart as CartItemType[]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setCartItems(state.cart as CartItemType[]);
        setTotal(state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }, [state.cart]);

    return (
        <div className="w-[22rem]  bg-custom-gradient text-white p-6 shadow-xl rounded-lg">
            {
                cartItems.length > 0 ? (
                    <div className="mb-3 space-y-3">
                        <div className="max-h-60 overflow-y-auto">
                            <ul className="space-y-3">
                                {cartItems.map(product => (
                                    <li key={product._id} className="flex items-center justify-between border-b border-gray-600 pb-2">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} className="w-12 h-12 rounded-md" alt={product.name} />
                                            <div>
                                                <p className="font-semibold">{product.name}</p>
                                                <p className="text-sm text-gray-300">{product.price}.00 x {product.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4 border-t border-gray-600 pt-4">
                            <p className="text-lg font-semibold">Total: {total.toFixed(2)}</p>
                        </div>
                        <Link href="/cart">
                            <button className="bg-customColor w-full mt-4 rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                                Go to Cart
                            </button>
                        </Link>
                    </div>
                ) : (
                    <p className='text-white'>Cart is empty</p>
                )
            }

        </div>
    )
}
export default FlyoutCartContent;
