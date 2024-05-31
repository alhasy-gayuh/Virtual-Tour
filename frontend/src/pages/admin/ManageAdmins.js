// src/pages/admin/ManageAdmins.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set the root element for the modal
Modal.setAppElement('#root');

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editId, setEditId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admins`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const openModal = (admin = null) => {
        if (admin) {
            setUsername(admin.username);
            setPassword('');
            setEditId(admin.id);
            setModalTitle('Edit Admin');
        } else {
            setUsername('');
            setPassword('');
            setEditId(null);
            setModalTitle('Add Admin');
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminData = { username, password };

        const token = localStorage.getItem('token');

        try {
            if (editId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/admins/${editId}`, adminData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admins/register`, adminData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            closeModal();
            fetchAdmins();
        } catch (error) {
            console.error('Error saving admin:', error.response.data);
            setError('Error saving admin. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/admins/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Admins</h1>
            <button
                onClick={() => openModal()}
                className="mb-4 bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-700 transition"
            >
                Add Admin
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {admins.map((admin) => (
                    <div key={admin.id} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">{admin.username}</h2>
                        <div className="mt-2 flex space-x-2">
                            <button onClick={() => openModal(admin)} className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition">Edit</button>
                            <button onClick={() => handleDelete(admin.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Admin Modal"
                className="modal bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
                        >
                            {editId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageAdmins;
