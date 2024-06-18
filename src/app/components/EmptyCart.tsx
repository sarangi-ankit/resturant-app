import React from 'react';
import Link from 'next/link';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img 
        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png?f=webp" 
        alt="Empty Cart" 
        className="w-40 h-auto md:w-60 md:h-auto lg:w-80 lg:h-auto mb-8"
      />
      <h3 className="text-xl font-semibold mb-2 text-center text-white">Your Cart is Empty</h3>
      <p className="text-white mb-6 text-center">You can go to the homepage to view more items.</p>
      <Link href="/" className="bg-secondaryColor border text-white px-6 py-3 rounded-md hover:bg-transparent hover:text-secondaryColor transition-colors">
        
          Go to Homepage
        
      </Link>
    </div>
  );
}

export default EmptyCart;
