import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Nav from "./nav";

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/exppro/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_access_token'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            // Update state to remove deleted item
            setData(data.filter(item => item.p_name !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            setError(error.message);
        }
    };

    const renderTableRows = () => {
        return data.map((item, index) => {
            if (item.userid === Cookies.get('username')) {
                return (
                    <tr key={item._id} className="bg-white hover:bg-gray-100">
                        <td className="border px-4 py-2">{item.p_name}</td>
                        <td className="border px-4 py-2">{item.exp_date.slice(0, 10)}</td>
                        <td className="border px-4 py-2 bg-slate-300">{item.quantity}</td>
                        <td>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleDelete(item.p_name)}
                            >
                                Delete
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
                <h2 className="text-2xl font-bold mb-4">Expired Products</h2>
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
                                    <th className="border px-4 py-2">expire dates</th>
                                    <th className="border px-4 py-2">quantity</th>
                                    <th className="border px-4 py-2">delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    renderTableRows()
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="border px-4 py-2 text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
