import React from 'react';
// import  from "react-dom";
import images from "./logo2.jpg";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  // const history=useHistory();

  // const handleRegisterClick=()=>{
  //   history.push("/register");
  // }
  // function navigateToAnotherPage() {
  //   // Navigate to another page programmatically
  //   window.location.href = '/register';
  // }

  const navigate = useNavigate(); // Initialize useNavigate hook

  const navigateToRegister = () => {
    navigate('/register'); // Navigate using navigate function
  };
  const navigationToLogin = () => {
    navigate('/login'); // Navigate using navigate function
  };

  const navigateToLogin = () => {
    // Clear username cookie on logout
    Cookies.remove('username');
    navigate('/homepage');
  };


  const isLoggedIn = Cookies.get('username') !== undefined;
  return (
    <nav className="bg-gray-800 p-4">
    <div className="flex items-center justify-between">
      {/* Left side - Logo/Brand Name */}
      <div className="flex items-center">
        <img src={images} alt="Logo" className="h-12 mr-2 w-12" />
        <span className="text-white text-xl font-bold">PHARMA+</span>
      </div>

      {/* Right side - Register and Login/Logout Buttons */}
      <div>
        {!isLoggedIn ? (
          <>
            {/* Show Register and Login buttons if not logged in */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={navigateToRegister}>
              Register
            </button>
            <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={navigationToLogin}>
              Login
            </button>
          </>
        ) : (
          <>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={navigateToLogin}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>

    
  </nav>
);
};

export default Navbar;