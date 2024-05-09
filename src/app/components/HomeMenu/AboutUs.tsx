import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-[40px]">

      {/* Image on the left side */}
      <div className="md:w-1/2 h-full">
        <img
          src="https://png.pngtree.com/thumb_back/fw800/background/20240109/pngtree-hamburger-burger-food-on-the-black-table-image_15608983.jpg"
          alt="About Us Image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text content on the right side */}
      <div className="md:w-1/2 bg-red-500 flex flex-col justify-center p-10 text-white">

        <h2 className="text-4xl font-bold mb-4">All About TSB</h2>

        <p className="text-lg mb-8">
          We have been serving irresistible comfort food since 1999. Our mission is to keep you smiling with every bite.<br /><br />
          Treat yourself to a feel-good meal today!
        </p>

        {/* Button */}
        <button 
          className="w-40 bg-black text-white py-2 px-6 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
            LEARN MORE
        </button>

      </div>

    </div>
  );
}

export default AboutUs;
