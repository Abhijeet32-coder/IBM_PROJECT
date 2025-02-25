import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';


function Register(){
const [details,setdetails]=useState({
    name:"",shop:"",address:"",email:""
});

const [submitted, setsubmitted] = useState(false);

const navigate = useNavigate(); 





const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: details.name,
        shop: details.shop,
        addr: details.address,
        email: details.email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to register.');
    }

    // Reset form fields by updating state
    setdetails({
      name: "",
      shop: "",
      address: "",
      email: ""
    });
setsubmitted(true);
navigate('/homepage'); 
    const json = await response.json();
    console.log(json);
    
  } catch (error) {
    console.error('Error:', error.message);
    // Handle error (e.g., display error message to user)
  }
};

  const update=(e)=>{
    setdetails({
        ...details,
        [e.target.name]:e.target.value
    })
  }
useEffect(()=>{
console.log("DATA HAS BEEN INSERTED");
})

return(
//     <div>
//         <form onSubmit={handleSubmit}> 
//       <table>
//         <tr>REGISTER FORM</tr>
//         <tr>
//         <th><label htmlFor="name">Name:</label></th>
//     <th><input type="text" id="name" name="name" value={details.name} onChange={update} required /></th></tr>
//     <br />
//     <tr>
//     <th><label htmlFor="shop">shop:</label></th>
//     <th><input type="text" id="shop" name="shop" value={details.shop} onChange={update} required/></th>
//     </tr> <br />
    
//     <tr><th><label htmlFor="address">address:</label></th>
//     <th><input type="text" id="address" name="address"  value={details.address} onChange={update} required/>
//     </th></tr><br />
//     <tr><th><label htmlFor="email">email:</label></th>
//     <th><input type="email" id="email" name="email"  value={details.email} onChange={update}required/>

//     </th></tr><br />
//     <hr>
//     </hr>
//     <tr><button type="submit">Submit</button></tr>
// </table>
//         </form>
//     </div>
<div className="flex justify-center items-center h-screen bg-gray-100 shadow-md  bg-gray-600 p-4">
<form id="register" onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
  <h2 className="mb-4 text-center text-xl">REGISTER FORM</h2>
  <table className="w-full">
    <tbody>
      <tr>
        <th><label htmlFor="name">Name</label></th>
        <td>
          <input type="text" id="name" name="name" value={details.name} onChange={update} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline" />
        </td>
      </tr>
      <tr>
        <th><label htmlFor="shop">Shop</label></th>
        <td>
          <input type="text" id="shop" name="shop" value={details.shop} onChange={update} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline" />
        </td>
      </tr>
      <tr>
        <th><label htmlFor="address">Address</label></th>
        <td>
          <input type="text" id="address" name="address" value={details.address} onChange={update} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline" />
        </td>
      </tr>
      <tr>
        <th><label htmlFor="email">Email</label></th>
        <td>
          <input type="email" id="email" name="email" value={details.email} onChange={update} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:shadow-outline" />
        </td>
      </tr>
    </tbody>
  </table>
  <div className="mt-6 text-center">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Submit</button>
  </div>
</form>
</div>
)
};

export default Register;




