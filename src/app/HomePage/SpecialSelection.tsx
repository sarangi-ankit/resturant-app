import React from 'react';

const SpecialSelection = () => {
    // Define your menu items data
    const menuItems = [
        { name: 'BEEF BURGER MEAL', description: 'Classic greek salad, barrel aged feta cheese, bread', price: '$10' },
        { name: 'ROASTED LAMB RUMP', description: 'Grilled lamb cutlets, pomegranate glaze, butternut squash', price: '$12' },
        { name: 'PAN SEARED SCALLOPS', description: 'Saffron, celeriac puree, black pudding, olive oil', price: '$15' },
        { name: 'BRAISED OX CHEEK RAVIOLI', description: 'Mediterranean olives casserole, celeriac puree, mushrooms', price: '$10' },
        { name: 'KING PRAWNS AND LOBSTER', description: 'Creamy saffron, sauce Vierge', price: '$12' },
        { name: 'CORN FED CHICKEN', description: 'Wild mushrooms, truffle potatoes, braised leeks, carrots', price: '$15' },
        // Add more menu items as needed
    ];

    return (
        <div className='bg-custom-background p-[8rem]'>
            <div className='mb-20'>
                <p className="font-miniver mb-4 text-2xl text-center">Special Selection</p>
                <h1 className="text-3xl font-subFont mb-4 tracking-widest lg:text-6xl text-center uppercase">From Our Menu</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <ul>
                            <li className="mb-8">
                                <div className="flex justify-between mb-3">
                                    <p className="font-menuFont text-lg tracking-widest">{item.name}</p>
                                    <p className="font-menuFont text-lg">{item.price}</p>
                                </div>
                                <p className="text-white text-lg font-customFont">{item.description}</p>
                            </li>
                        </ul>

                    </div>
                ))}
                
            </div>
            <div className="flex justify-center mt-10">
                    <button className="font-buttonFont bg-transparent border border-customColor text-white py-4 px-12 rounded hover:bg-white hover:text-black">
                        View All
                    </button>
                </div>

        </div>
    );
}

export default SpecialSelection;
