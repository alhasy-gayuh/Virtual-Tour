// src/pages/ToursPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToursHeroSection from '../components/ToursHeroSection';
import SearchComponent from '../components/SearchComponent.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ToursPage = () => {
    const [tours, setTours] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours`);
                setTours(response.data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, []);

    const handleSearch = term => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredTours = tours.filter(tour =>
        tour.name.toLowerCase().includes(searchTerm)
    );
    return (
        <div>
            <Header />
            <ToursHeroSection />
            <div className="container mx-auto">
                <SearchComponent onSearch={handleSearch} />
                <h1 className="text-2xl font-bold mb-4">All Tours</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredTours.map((tour) => (
                        <div key={tour.id} className="border rounded-lg p-4 shadow-lg">
                            <img src={`${process.env.REACT_APP_BASE_URL}/${tour.image}`} alt={tour.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                            <h2 className="text-lg font-bold">{tour.name}</h2>
                            <p>{tour.description}</p>
                            <Link to={`/tour/${tour.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ToursPage;
