import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admins/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('adminName', username); // Simpan username admin
            navigate('/admin/dashboard');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input mt-1 block w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input mt-1 block w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
