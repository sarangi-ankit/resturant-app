"use client"
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/Context';

const AddressDetails = () => {
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');

    const handleCheckout = () => {
     
        console.log('Name:', name);
        console.log('Address:', address);
        console.log('Pincode:', pincode);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Checkout Details</h2>
            <form onSubmit={handleCheckout} className="max-w-md space-y-4">
                <div className='bg-transparent'>
                    <label htmlFor="name" className="block font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block font-medium">Address</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent">
                        
                    </textarea>
                </div>
                <div>
                    <label htmlFor="pincode" className="block font-medium">Pincode</label>
                    <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-customColor text-white font-medium py-2 px-4 rounded hover:bg-secondaryColor">
                    Proceed to Checkout
                </button>
            </form>
        </div>
    );
};

export default AddressDetails;
