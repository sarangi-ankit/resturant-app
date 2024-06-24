import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-custom-background text-white py-20">
      <div className="container mx-auto my-20 px-4 flex flex-col items-center justify-center text-center">
        <img src="images/logo.png" alt="logo" className="mb-4" />
        <p className="mb-4">
          Laurent Restaurant and Fine Dining, 71 Madison Ave
        </p>
        <p className="mb-4">
          10013 New York, +91-8917360749, ankitsarangi21@gmail.com
        </p>
        <p className="mb-4">
          Open: 09:00 am – 01:00 pm
        </p>
        <nav className="mb-4">
          <ul className="flex space-x-4 justify-center text-customColor">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4 justify-center">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
