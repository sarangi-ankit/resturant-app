import React from 'react';
import CartItem from '../components/CartItem';
import AdressDetails from '../components/AdressDetails';

const Cart = () => {
    return (
        <div className="min-h-screen bg-custom-background text-customColor flex flex-col justify-center items-center p-4 lg:p-8">
            <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
            <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8 justify-center items-start">
                <div className="w-full md:w-1/2 p-4 lg:p-8">
                    <CartItem />
                </div>
                <div className="w-full md:w-1/2 p-4 lg:p-8">
                    <AdressDetails />
                </div>
            </div>
        </div>
    );
};

export default Cart;
