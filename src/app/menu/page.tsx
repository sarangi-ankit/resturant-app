"use client"
import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import MenuList from '../components/MenuList';


const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    return (
        <div className='bg-custom-gradient py-10'>
            <CategoryList onSelectCategory={(categoryId: string) => setSelectedCategory(categoryId)} />
            <MenuList selectedCategory={selectedCategory} />
        </div>
    );
    
}

export default Menu;
