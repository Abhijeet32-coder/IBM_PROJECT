
import React from 'react';
import image from "./billing.svg"
function Homepage(){
    return (
        <div>
        <header className="bg-blue-500 p-4">
          <div className="container mx-auto">
            <h1 className="text-white text-4xl font-bold">Pharmacy Plus</h1>
            <p className="text-white text-lg mt-2">Your Trusted Partner in Health</p>
          </div>
        </header>


       

    <section className="bg-green-400 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-400 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4">Online Pharmacy management system</h3>
            <p className="text-gray-700">check your stock online with ease and convenience.</p>
          </div>
          <div className="bg-lime-300 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4">Consultation Services</h3>
            <p className="text-gray-700">Speak directly with our pharmacists for personalized health advice.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-orange-300 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Pharmacy Plus is dedicated to providing high-quality pharmaceutical products and personalized health services to our community.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img src={image} alt="About Pharmacy" className="rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </section>





        </div>
      );
    };


    export default Homepage;