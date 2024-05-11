"use client"
import React, { useEffect, useState } from 'react';

const AboutUs = () => {
  const [currentText, setCurrentText] = useState(0)

  const texts = [
    {
      heading: "We have a proper passion for cooking, Love is the secret ingredient that makes all of us happy",
      author: "ankit sarangi",
      profession: "cook"
    },
    {
      heading: "From the delicious food to wonderful cocktail to satisfy all of your taste buds",
      author: "Tim David",
      profession: "cook"
    },
    {
      heading: "Experiment in the kitchen and focus on excellence are among our main driving forces in cooking",
      author: "Tim paine",
      profession: "cook"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((currentText: any) => (currentText + 1) % texts.length);
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <p className="mb-4 text-2xl text-center">Our Story</p>
      <h1 className="text-5xl font-bold mb-4 text-center">About Us</h1>
      <div className="max-w-lg text-center">
        <p>
          We have been serving irresistible comfort food since 1999. Our mission is to keep you smiling with every bite.
        </p>
        <p className="mt-4">Treat yourself to a feel-good meal today!</p>
      </div>
      <div className="flex justify-center mt-8 gap-10">
        <div className="flex items-center">
          <img src="/images/about1.jpg" alt="About 1" className="w-[45%] md:w-auto h-auto md:h-80 mx-2 mb-4" />
          <img src="/images/about1.jpg" alt="About 1" className="w-[45%] md:w-auto h-auto md:h-80 mx-2  mb-4" />
          <img src="/images/about2.jpg" alt="About 2" className="w-[45%] md:w-auto h-auto md:h-80 mx-2 mb-4" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-8 bg-custom-background">
  <div className="flex-1">
    <div className="text-center lg:text-center"> {/* Center text on small screens, left align on larger screens */}
      <h2 className="text-3xl font-bold mb-4">{texts[currentText].heading}</h2>
      <p>{texts[currentText].author}</p>
      <p>{texts[currentText].profession}</p>
    </div>
  </div>
  <div className="flex-1">
    <img src="/images/about4.jpg" alt="Example" className="w-full h-auto" />
  </div>
</div>

    </div>
  );
}

export default AboutUs;
