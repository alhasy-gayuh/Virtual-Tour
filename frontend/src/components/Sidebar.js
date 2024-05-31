// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="flex flex-col max-h-screen h-screen p-4 bg-gray-800 text-white">
            <div className="flex flex-col flex-grow">
                <Link to="/" className="text-2xl font-bold mb-8">Virtual Tour</Link>
                <Link to="/admin/dashboard" className="mb-4">Dashboard</Link>
                <Link to="/admin/tours" className="mb-4">Manage Tours</Link>
                <Link to="/admin/admins" className="mb-4">Manage Admins</Link>
            </div>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
