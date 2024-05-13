import React from 'react';

const MenuItems = () => {
  return (
    <div className="container mx-auto mt-20 px-4">
      <p className='text-2xl font-bold text-center'>tasty offers</p>
      <h1 className="text-6xl font-bold text-center mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-20">
        <div className=" rounded-lg shadow-md overflow-hidden">
          <img src="/images/menu1.jpg" alt="Image 1" className="w-full h-80 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Title 1</h2>
            <p className="text-gray-700">Description of the item goes here.</p>
          </div>
        </div>
        <div className=" rounded-lg shadow-md overflow-hidden">
          <img src="/images/menu2.jpg" alt="Image 2" className="w-full h-80 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Title 2</h2>
            <p className="text-gray-700">Description of the item goes here.</p>
          </div>
        </div>
        <div className=" rounded-lg shadow-md overflow-hidden">
          <img src="/images/menu3.jpg" alt="Image 3" className="w-full h-80 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Title 3</h2>
            <p className="text-gray-700">Description of the item goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
