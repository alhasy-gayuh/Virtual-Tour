// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="hero" style={{ backgroundImage: 'url("https://images.pexels.com/photos/20259577/pexels-photo-20259577/free-photo-of-bawean-deer-in-close-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
            <div className="hero-content">
                <h1>Explore Bawean</h1>
                <p>Discover the hidden gem of Indonesia.</p>
                <Link to="/tours" className="explore-now-button">Explore Now</Link>
            </div>
        </section>
    );
};

export default HeroSection;
