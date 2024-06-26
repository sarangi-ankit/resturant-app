"use client"
"use client"
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/Context';

const AddressDetails = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state,dispatch } = context;
    const { cart } = state;
    const [address, setAddress] = useState({
        name: '',
        location: '',
        pincode: '',
        state: '',
        country: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        location: '',
        pincode: '',
        state: '',
        country: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        if (!address.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!address.location) {
            newErrors.location = 'Location is required';
            isValid = false;
        }
        if (!address.pincode) {
            newErrors.pincode = 'Pincode is required';
            isValid = false;
        }
        if (!address.state) {
            newErrors.state = 'State is required';
            isValid = false;
        }
        if (!address.country) {
            newErrors.country = 'Country is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const proceedCheckout = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address, cart }),
            });

            const result = await response.json();
            if (response.ok) {
                // Store cart in local storage before clearing it
                localStorage.setItem('orderCart', JSON.stringify(cart));
                dispatch({ type: 'CLEAR_CART' });

                window.location.href = result.url;
            } else {
                console.error('Error during checkout:', result.message);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Checkout Details</h2>
            <form className="max-w-md space-y-4" onSubmit={proceedCheckout}>
                <div className='bg-transparent'>
                    <label htmlFor="name" className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={address.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="address" className="block font-medium">Address</label>
                    <textarea
                        name="location"
                        value={address.location}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent">
                    </textarea>
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>
                <div>
                    <label htmlFor="pincode" className="block font-medium">Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                </div>
                <div>
                    <label htmlFor="state" className="block font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
                <div>
                    <label htmlFor="country" className="block font-medium">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-secondaryColor text-white font-medium py-2 px-4 rounded hover:bg-customColor"
                >
                    Proceed to Checkout
                </button>
            </form>
        </div>
    );
};

export default AddressDetails;
