// src/pages/admin/ManageTours.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

// Set the root element for the modal
Modal.setAppElement('#root');

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [vrImage, setVrImage] = useState(null);
    const [editId, setEditId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/admin/login');
        } else {
            fetchTours();
        }
    }, [navigate]);

    const fetchTours = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours`);
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const openModal = (tour = null) => {
        if (tour) {
            setName(tour.name);
            setDescription(tour.description);
            setImage(tour.image);
            setVrImage(tour.vrImage);
            setEditId(tour.id);
            setModalTitle('Edit Tour');
        } else {
            setName('');
            setDescription('');
            setImage(null);
            setVrImage(null);
            setEditId(null);
            setModalTitle('Add Tour');
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        if (vrImage) {
            formData.append('vrImage', vrImage);
        }

        const token = localStorage.getItem('token');

        try {
            if (editId) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tours/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tours`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            closeModal();
            fetchTours();
        } catch (error) {
            console.error('Error saving tour:', error);
            setError('Error saving tour. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tours/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTours();
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Tours</h1>
            <button
                onClick={() => openModal()}
                className="mb-4 bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-700 transition"
            >
                Add Tour
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tours.map((tour) => (
                    <div key={tour.id} className="border p-4 rounded-lg shadow-md">
                        <img src={`${process.env.REACT_APP_BASE_URL}/${tour.image}`} alt={tour.name} className="w-full h-40 object-cover rounded mb-2" />
                        <h2 className="text-lg font-bold">{tour.name}</h2>
                        <p>{tour.description}</p>
                        <div className="mt-2 flex space-x-2">
                            <button onClick={() => openModal(tour)} className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition">Edit</button>
                            <button onClick={() => handleDelete(tour.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Tour Modal"
                className="modal bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        {editId && image && (
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/${image}`}
                                alt="current"
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">VR Image</label>
                        {editId && vrImage && (
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/${vrImage}`}
                                alt="current"
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <input
                            type="file"
                            onChange={(e) => setVrImage(e.target.files[0])}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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

export default ManageTours;
