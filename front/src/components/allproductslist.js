
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import Nav from "./nav";

// const Table = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/allproducts');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const result = await response.json();
//                 if (Array.isArray(result)) {
//                     setData(result);
//                 } else {
//                     throw new Error('Returned data is not an array');
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleAdd = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/allproducts/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer your_access_token'
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete item');
//             }
//             setData(data.filter(item => item.p_name !== id));
//         } catch (error) {
//             console.error('Error deleting item:', error);
//             setError(error.message);
//         }
//     };

//     const renderTableRows = () => {
//         return data.map((item, index) => {
//             if (item.userid === Cookies.get('username')) {
//                 return (
//                     <tr key={item._id} className="bg-white hover:bg-gray-100">
//                         <td className="border px-4 py-2">{item.p_name}</td>
//                         <td className="border px-4 py-2">{item.p_type}</td>
//                         <td className="border px-4 py-2">{item.exp_date.slice(0, 10)}</td>
//                         <td className="border px-4 py-2 bg-slate-300">{item.quantity}</td>
//                         <td className="border px-4 py-2">{item.cost}</td>
//                         <td>
//                             <button
//                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                 onClick={() => handleAdd(item.p_name)}
//                             >
//                                 Add
//                             </button>
//                         </td>
//                     </tr>
//                 );
//             } else {
//                 return null;
//             }
//         });
//     };

//     return (
//         <div>
//             <Nav />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4">Expired Products</h2>
//                 <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : error ? (
//                         <p>Error: {error}</p>
//                     ) : (
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="border px-4 py-2">product name</th>
//                                     <th className="border px-4 py-2">product type</th>
//                                     <th className="border px-4 py-2">expire dates</th>
//                                     <th className="border px-4 py-2">quantity</th>
//                                     <th className="border px-4 py-2">Cost</th>
//                                     <th className="border px-4 py-2">Add</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data.length > 0 ? (
//                                     renderTableRows()
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="4" className="border px-4 py-2 text-center">
//                                             No data available
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Table;



import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Nav from "./nav";

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/allproducts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    throw new Error('Returned data is not an array');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAdd = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/allproducts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_access_token'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to add item');
            }
            
            // Update data state after successful update on the server
            setData(data.map(item => {
                if (item.p_name === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            }).filter(item => item.quantity > 0)); // Remove items with quantity 0

        } catch (error) {
            console.error('Error adding item:', error);
            setError(error.message);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const renderTableRows = () => {
        // Filter data based on search term
        const filteredData = data.filter(item => {
            return item.p_name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Ensure filteredData is defined and has a length property
        if (!filteredData || filteredData.length === 0) {
            return (
                <tr>
                    <td colSpan="6" className="border px-4 py-2 text-center">
                        No matching products found
                    </td>
                </tr>
            );
        }

        return filteredData.map((item, index) => {
            if (item.userid === Cookies.get('username')) {
                return (
                    <tr key={item._id} className="bg-white hover:bg-gray-100">
                        <td className="border px-4 py-2">{item.p_name}</td>
                        <td className="border px-4 py-2">{item.p_type}</td>
                        <td className="border px-4 py-2">{item.exp_date.slice(0, 10)}</td>
                        <td className="border px-4 py-2 bg-slate-300">{item.quantity}</td>
                        <td className="border px-4 py-2">{item.cost}</td>
                        <td>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleAdd(item.p_name)}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                );
            } else {
                return null;
            }
        });
    };

    return (
        <div>
            <Nav />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">PRODUCTS AVAILABLE</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border px-4 py-2 mb-2"
                    />
                </div>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">product name</th>
                                    <th className="border px-4 py-2">product type</th>
                                    <th className="border px-4 py-2">expire dates</th>
                                    <th className="border px-4 py-2">quantity</th>
                                    <th className="border px-4 py-2">Cost</th>
                                    <th className="border px-4 py-2">Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRows()} {/* Render table rows based on the function call */}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
