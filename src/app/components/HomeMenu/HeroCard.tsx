"use client"
import React, { useState, useEffect } from 'react';
import Header from '../Header'; // Import your Header component

const HeroCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/images/mocktail.jpg',
    '/images/chicken-peeper.jpg',
    '/images/mocktail1.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []); // Run once on component mount

  return (
    <div className="relative max-w-screen-2xl mx-auto">
      <img
        src={images[currentImage]}
        alt={`slide${currentImage + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full">
        <Header /> 
      </div>
    </div>
  );
}

export default HeroCard;
