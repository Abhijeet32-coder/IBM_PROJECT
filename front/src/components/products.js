import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const ProductForm = () => {
  const [formData, setFormData] = useState({
    userid: Cookies.get('username') || '', 
    p_name: '',
    p_type: '',
    quantity: '',
    cost: '',
    exp_date: '',
    comp_name: ''
  });

const navigate=useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/addtablet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid:formData.userid, 
    p_name: formData.p_name,
    p_type: formData.p_type,
    quantity: formData.quantity,
    cost: formData.cost,
    exp_date: formData.exp_date,
    comp_name: formData.comp_name
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to register.');
      }
  navigate('/button'); 
      const json = await response.json();
      console.log(json.message);
      
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-600 pt-32 pb-32 h-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h2 className="text-2xl text-center font-bold mb-4">Product Form</h2>
        <div className="mb-4">
          <label htmlFor="userid" className="block text-gray-700 text-sm font-bold mb-2">
            User ID
          </label>
          <input
           type="text"
           id="userid"
           name="userid"
           value={formData.userid}
           className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
           placeholder="Enter User ID"
           readOnly 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="p_name" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="p_name"
            name="p_name"
            value={formData.p_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            placeholder="Enter Product Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="p_type" className="block text-gray-700 text-sm font-bold mb-2">
            Product Type
          </label>
          <input
            type="text"
            id="p_type"
            name="p_type"
            value={formData.p_type}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            placeholder="Enter Product Type"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            placeholder="Enter Quantity"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cost" className="block text-gray-700 text-sm font-bold mb-2">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            placeholder="Enter Cost"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exp_date" className="block text-gray-700 text-sm font-bold mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            id="exp_date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="comp_name" className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="comp_name"
            name="comp_name"
            value={formData.comp_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
            placeholder="Enter Company Name"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
