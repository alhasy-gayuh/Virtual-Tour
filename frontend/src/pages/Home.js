import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import FeaturedTours from '../components/FeaturedTours';
import AboutSection from '../components/AboutSection';

const Home = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/tours`)
            .then(response => setTours(response.data.slice(0, 3))) // Assuming the API returns an array of tours
            .catch(error => console.error('Error fetching tours:', error));
    }, []);

    return (
        <div>
            <Header />
            <HeroSection />
            <IntroductionSection />
            <FeaturedTours tours={tours} />
            <AboutSection />
            <Footer />
        </div>
    );
};

export default Home;
