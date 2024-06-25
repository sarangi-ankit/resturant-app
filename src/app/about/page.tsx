import React from 'react';

const About = () => {
  return (
    <div className='bg-custom-gradient min-h-screen flex items-center justify-center'>
      <div className="max-w-full mx-auto">

        <img src="/images/About-us-banner.jpg" alt="Banner" className="w-full" />

        {/* about us section */}
        <div className="mt-20 text-center text-white">

          <p className="font-miniver mb-4 text-2xl text-customColor">Restaurant life</p>
          <h1 className="text-5xl font-subFont mb-4 lg:tracking-[12px] lg:text-6xl text-center text-customColor">About Us</h1>
          <div className="flex flex-col lg:flex-row items-center justify-center mt-10 px-16">
            <img src="/images/about-1.jpg" alt="Side Image 1" className="w-full lg:w-1/4 mb-4 lg:mb-0 lg:mr-4" />

            <div className="w-42 font-customFont tracking-wide max-w-lg mx-auto text-center lg:text-center justify-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>

              <p className="mt-4">Treat yourself to a feel-good meal today!</p>

            </div>
            <img src="/images/about-1.jpg" alt="Side Image 2" className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-4" />

          </div>
          {/* meet our chef */}
          <div className='w-full flex flex-col lg:flex-row items-center my-20'>
            <div className='w-full lg:w-1/2 p-4 text-white flex flex-col items-center'>
              <h1 className='font-miniver lg:text-4xl text-2xl font-bold mb-4 text-customColor text-center'>Meet Our Chef</h1>
              <div className='w-full lg:w-[50%] leading-relaxed text-center mb-10'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  <br /><br />
                  Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </div>
            <div className='w-full lg:w-1/2 flex justify-center'>
              <img src="/images/chef.jpg" alt="Chef" className='w-full h-auto lg:w-[450px] rounded-lg shadow-lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
