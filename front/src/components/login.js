import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         user:credentials.username,
         password:credentials.password,
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to register.');
      }
  

      
      const json = await response.json();
      console.log(json.username);
      Cookies.set('username',json.username,{ expires: 1 })
      navigate('/button'); 
      // Reset form fields by updating state
      setCredentials({
      username:" ",
      password:" "
      });
      
    
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"> 
        <h2 className="mb-4 text-center text-xl">LOGIN FORM</h2>
        <div className="mb-4">
           
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;
