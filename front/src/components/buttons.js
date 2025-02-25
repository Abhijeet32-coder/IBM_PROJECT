import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import billing from './billing.svg'; // Replace with your actual logo image paths
import addproduct from './addproduct.svg';
import products from './product.svg';
import expire from './calender.svg';

const ButtonsWithLogos = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Data for buttons
  const buttonsData = [
    { logo: products, text: 'products', route: '/allproducts' },
    { logo: addproduct, text: 'Add Product', route: '/products' },
    { logo: expire, text: 'Expired product', route: '/expproducts' },
    { logo: billing, text: 'About us', route: '/aboutus' }
  ];

  // Function to handle button click
  const handleButtonClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <div className="flex justify-around m-5">
      {buttonsData.map((button, index) => (
        <button key={index} onClick={() => handleButtonClick(button.route)} className="flex flex-col items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 ">
          <img src={button.logo} alt={`Logo ${index}`} className="h-12 w-30 mb-2" />
          <span>{button.text}</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonsWithLogos;