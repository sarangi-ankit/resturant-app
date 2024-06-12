"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/Context';
import { MdDeleteOutline } from "react-icons/md";
import { cartReducer } from '../context/Reducer'; // Importing your cartReducer

interface CartItemType {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const CartItem = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state, dispatch } = context;
    const [cartItems, setCartItems] = useState<CartItemType[]>(state.cart as CartItemType[]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setCartItems(state.cart as CartItemType[]);
    }, [state.cart]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((total, item) => total + (item.price) * (item.quantity), 0);
        setTotal(totalPrice);
    }, [cartItems]);

    let deliveryCharge = 5.00;
    const totalWithDelivery = (total + deliveryCharge).toFixed(2);

    const deleteFromCart = (itemId: any) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    }

    const decreaseQuantity = (itemId: string) => {
        dispatch({ type: "CART_QUANTITY", payload: { _id: itemId, quantity: -1 } });
    }

    const increaseQuantity = (itemId: string) => {
        dispatch({ type: "CART_QUANTITY", payload: { _id: itemId, quantity: 1 } });
    }

    return (
        <div className="min-h-screen bg-custom-gradient flex justify-center items-center">
            <div className="max-w-3xl w-full p-4 rounded shadow-lg">
                <div className="h-96 overflow-y-auto">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                            <div className="flex items-center">
                                <div>
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />

                                    <div className='mt-2 flex items-center border border-customColor rounded w-20 hover:bg-customColor hover:text-white'>
                                        <button onClick={() => decreaseQuantity(item._id)} className="px-2 py-1  rounded-l">-</button>
                                        <p className="px-2">{item.quantity}</p>
                                        <button onClick={() => increaseQuantity(item._id)} className="px-2 py-1 rounded-r">+</button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p>{item.price}.00</p>
                                </div>
                            </div>

                            <button onClick={() => deleteFromCart(item._id)} className="w-10">
                                <MdDeleteOutline />
                            </button>
                        </div>
                    ))}
                    {cartItems.length === 0 && <p className="text-center mt-4">Your cart is empty</p>}
                </div>
                <div className="mt-4 text-xl tracking-wider flex-col">
                    <p>SubTotal: {total.toFixed(2)}</p>
                    <p>Delivery: {deliveryCharge.toFixed(2)}</p>
                    <p>Total: {totalWithDelivery}</p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
