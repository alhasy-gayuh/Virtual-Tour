// src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [toursCount, setToursCount] = useState(0);
    const [adminsCount, setAdminsCount] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/admin/login');
        }

        const fetchCounts = async () => {
            try {
                const toursRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours`);
                setToursCount(toursRes.data.length);

                const adminsRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admins`);
                setAdminsCount(adminsRes.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, [navigate]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Total Tours</h2>
                    <p className="text-3xl">{toursCount}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Total Admins</h2>
                    <p className="text-3xl">{adminsCount}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
