import React from 'react';

const BestSeller = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">

      {/* Text content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">What We Offer</h1>
        <p className="text-lg text-gray-600 mb-4">Curious? Here are our most popular menu items.</p>
      </div>

      {/* Food items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {/* Food Item 1 */}
        <div className="flex flex-col items-center">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Food Item 1" 
            className="rounded-lg mb-2"
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <h3 className="text-lg font-semibold mb-2">Food Item 1</h3>
        </div>

        {/* Food Item 2 */}
        <div className="flex flex-col items-center">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Food Item 2" 
            className="rounded-lg mb-2"
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <h3 className="text-lg font-semibold mb-2">Food Item 2</h3>
        </div>

        {/* Food Item 3 */}
        <div className="flex flex-col items-center">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Food Item 3" 
            className="rounded-lg mb-2"
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <h3 className="text-lg font-semibold mb-2">Food Item 3</h3>
        </div>

        {/* Add more food items as needed */}

      </div>

      {/* Centered Button */}
      <button className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
        View All Items
      </button>

    </div>
  );
}

export default BestSeller;
