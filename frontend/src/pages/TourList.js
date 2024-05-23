import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TourList = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tours');
                setTours(response.data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Tours</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tours.map((tour) => (
                    <div key={tour.id} className="border rounded-lg p-4">
                        <img src={`http://localhost:5000/${tour.image}`} alt={tour.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                        <h2 className="text-lg font-bold">{tour.name}</h2>
                        <p>{tour.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourList;
