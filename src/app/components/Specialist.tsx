import React from 'react';

const Specialist = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 my-16 p-8 lg:p-8 lg:mt-24">
            <div className="flex-1 lg:w-1/2">
                <img src="/images/about5.jpg" alt="Specialist" className="w-full h-auto lg:mx-auto lg:px-16" />
            </div>
            <div className="flex-1 lg:w-1/2 text-center lg:text-center">
                <div className='p-8'>
                    <p>Recommendation</p>
                    <h2 className="text-3xl font-bold mb-4">Our best Specialities</h2>
                    <p className="mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,</p>
                    <button className="bg-transparent border border-customColor mt-10 text-white py-4 px-12 rounded hover:bg-white hover:text-black">
                    View More
                </button>
                </div>

            </div>
        </div>
    );
}

export default Specialist;
