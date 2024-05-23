import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
                setTour(response.data);
            } catch (error) {
                setError('Tour not found');
                console.error('Error fetching tour:', error);
            }
        };

        fetchTour();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!tour) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{tour.name}</h1>
            <img src={`http://localhost:5000/${tour.image}`} alt={tour.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p>{tour.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">View 360 Panorama</button>
        </div>
    );
};

export default TourDetail;
