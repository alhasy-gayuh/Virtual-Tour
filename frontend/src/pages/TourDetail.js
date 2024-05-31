import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Panorama = lazy(() => import('../components/Panorama'));

const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [error, setError] = useState('');
    const [showPanorama, setShowPanorama] = useState(false);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours/${id}`);
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
        <div>
            <Header />
            <div className="relative w-full h-96 mb-4">
                <img src={`${process.env.REACT_APP_BASE_URL}/${tour.image}`} alt={tour.name} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                    <h1 className="text-4xl lg:text-6xl font-bold">{tour.name}</h1>
                </div>
            </div>
            <div className=" container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-2xl font-bold mb-4">About the Tour</h2>
                    <p className="mb-4">{tour.description}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setShowPanorama(!showPanorama)}
                    >
                        {showPanorama ? 'Hide 360 Panorama' : 'View 360 Panorama'}
                    </button>
                    {showPanorama && (
                        <Suspense fallback={<div>Loading Panorama...</div>}>
                            <div className="mt-4" style={{ height: '500px' }}>
                                <Panorama vrImage={`${process.env.REACT_APP_BASE_URL}/${tour.vrImage}`} />
                            </div>
                        </Suspense>
                    )}
                </div>
                <Link to="/tours" className="inline-block mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Tours
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default TourDetail;
