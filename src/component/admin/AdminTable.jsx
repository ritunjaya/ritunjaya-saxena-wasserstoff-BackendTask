import React, { useState, useEffect } from 'react';
import { BASE_URL, BASE_URL_CLOUDINARY } from '../../constants/env';
import LeftPanel from '../LeftPanel';
const AdminTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/review`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            const result = responseData.images.map((item) => {
                return {
                    id: item._id,
                    name: item.userId.name,
                    image: `${BASE_URL_CLOUDINARY}/${item.imagePath}`,
                    status: item.status,
                    annotation: item.annotation,
                }
            });
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleView = async (id) => {
        const response = await fetch(`${BASE_URL}/admin/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')} `,
            }
        })
    };

    const handleApprove = async (id) => {
        const response = await fetch(`${BASE_URL}/admin/approve/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')} `,
            }
        })

        console.log('Response:', response);
        if (response.status === 200) {
            alert("Image Approved Successfully");
            fetchData();
        } else {
            alert("Image Approved Failed")
        }
    };

    const handleReject = async (id) => {
        const response = await fetch(`${BASE_URL}/admin/reject/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')} `,
            }
        })

        if (response.status === 200) {
            alert("Image Rejected Successfully")
            fetchData();
        }
        else {
            alert("Image Rejected Failed")
        }
    };

    return (
        <table className="table-auto w-full ml-[300px]">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Annotation</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} >
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">
                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full" />
                        </td>
                        <td className="border px-4 py-2">{item.status}</td>
                        <td className="border px-4 py-2 overflow-y-scroll scrollbar-hide h-[200px]">
                            {
                                item.annotation.map((tag, index) => {
                                    return (
                                        <p>{tag.name}</p>
                                    )

                                })
                            }
                        </td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleApprove(item.id)} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Approve
                            </button>
                            <button onClick={() => handleReject(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Reject
                            </button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
};

export default AdminTable;
