"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/Context';

interface Category {
    _id: string;
    name: string;
    image: string;
}

const CategoryList = ({ onSelectCategory }: { onSelectCategory: (categoryId: string) => void }) => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a CartProvider");
    }

    const { state } = context;
    const [categoryItem, setCategoryItem] = useState<Category[]>(state.categories);

    useEffect(() => {
        setCategoryItem(state.categories);
    }, [state.categories]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                
                {categoryItem.map(cat => (
                    <div key={cat._id} className="bg-transparent rounded-lg p-4 flex flex-col items-center cursor-pointer" onClick={() => onSelectCategory(cat._id)}>
                        <img src={cat.image} className="w-16 h-16 object-cover rounded-full mb-2" alt={cat.name} />
                        <p className='text-white text-center font-semibold'>{cat.name}</p>
                    </div>
                ))}
                <div className="bg-transparent rounded-lg p-4 flex flex-col items-center cursor-pointer mt-10" onClick={() => onSelectCategory("")}>
                    
                    <p className='text-white text-center font-semibold hover:text-secondaryColor'>View All -</p>
                </div>
            </div>
            
        </div>
    );
}

export default CategoryList;
