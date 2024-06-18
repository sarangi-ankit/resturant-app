"use client"
import React, { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import AddressDetails from '../components/AddressDetails';
import { CartContext } from '../context/Context';
import EmptyCart from '../components/EmptyCart';
import CustomLoader from '../components/layout/CustomLoader'

interface CartItemType {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const Cart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }
    const { state, dispatch } = context;
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setCartItems(state.cart as CartItemType[]);
        setLoading(false);
    }, [state.cart]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CustomLoader/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-custom-background text-customColor flex flex-col justify-center items-center p-4 lg:p-8">
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
                    <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8 justify-center items-start">
                        <div className="w-full md:w-1/2 p-4 lg:p-8">
                            <CartItem />
                        </div>
                        <div className="w-full md:w-1/2 p-4 lg:p-8">
                            <AddressDetails />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
