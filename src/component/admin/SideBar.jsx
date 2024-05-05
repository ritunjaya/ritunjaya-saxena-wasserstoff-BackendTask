import React from 'react';

const Sidebar = ({ isOpen = true }) => {


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <div className={`bg-gray-800 bg-opacity-50  ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                </div>
                <div className="p-4">
                    <ul>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            <a href="/admin/dashboard">
                                Dashboard
                            </a>
                        </li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            <a href="/admin/review">
                                Review
                            </a>
                        </li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
