// ToursHeroSection.js
import React from 'react';

const ToursHeroSection = () => {
    return (
        <div className="relative h-3/4-screen w-full h-screen">
            <img src="https://images.pexels.com/photos/3531814/pexels-photo-3531814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="absolute inset-0 w-full h-full object-cover" alt="Bawean" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-4xl lg:text-6xl font-bold">Discover Tours in Bawean</h1>
                <p className="text-xl lg:text-2xl mt-4">Explore exciting destinations with us.</p>
            </div>
        </div>
    );
};

export default ToursHeroSection;
