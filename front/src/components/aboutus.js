import React from 'react';
import image from "./pharmacy.jpeg"
import Nav from "./nav"
const AboutUsPage = () => {
  return (
    <div><Nav/>
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h1>
        
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <img className="rounded-lg shadow-md" src={image} alt="Team" />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod diam eu tortor convallis,
              eu scelerisque lacus fermentum. Duis a augue at leo dictum viverra. Ut sit amet dolor quis est
              condimentum feugiat nec eu neque. Morbi tincidunt ipsum id tortor dignissim mollis. Sed dapibus,
              justo ac volutpat vestibulum, velit nunc ultricies lorem, sed fermentum dui magna sed eros.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Integer et orci at nulla pharetra malesuada vitae nec augue. Aliquam erat volutpat. Nullam
              placerat vehicula nunc, sit amet dapibus enim scelerisque eu. Aliquam quis massa id lectus
              eleifend convallis.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">John Doe</h3>
                <p className="text-gray-700">CEO</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Jane Smith</h3>
                <p className="text-gray-700">CTO</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Alice Johnson</h3>
                <p className="text-gray-700">COO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUsPage;
