import './App.css';
import Cookies from "js-cookie";
import Nav from "./components/nav";
import Register from "./components/register"
import Login from "./components/login";
import Button from "./components/buttnav"
import Product from "./components/products.js"
import Expire from "./components/expired.js"
import Allproducts from "./components/allproductslist.js"
import Home from "./components/home"
import About from "./components/aboutus"
import { BrowserRouter as Router, Route, Routes}from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {!Cookies.get('username') ? (
          <Route path="/" element={<Home />} /> 
        ) : (
          <Route path="/" element={<Button />} /> 
        )}
          <Route path="/homepage" element={<Home/>}/>
          <Route path="/home" element={<Nav/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/button" element={<Button/>}/>
          <Route path="/products" element={<Product/>}/>
          <Route path="/expproducts" element={<Expire/>}/>
          <Route path="/allproducts" element={<Allproducts/>}/>
          <Route path="/aboutus" element={<About/>}/>
        </Routes>
      </Router>


{/* <Router>
      <Routes>
        
        {!Cookies.get('username') ? (
          <Route path="/" element={<Home />} /> 
        ) : (
          <Route path="/" element={<Button />} /> 
        )}
        <Route path="/homepage" element={<Home />} />
        <Route path="/home" element={<Nav />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/button" element={<Button />} />
        <Route path="/products" element={<Product />} />
        <Route path="/expproducts" element={<Expire />} />
        <Route path="/allproducts" element={<Allproducts />} />
       
      </Routes>
    </Router> */}
      
    </div>
  );
}

export default App;
