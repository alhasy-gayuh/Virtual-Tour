// ToursList.js
import React from 'react';
import TourCard from './TourCard'; // Asumsikan TourCard adalah komponen yang sudah ada

const ToursList = ({ tours }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {tours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
};

export default ToursList;
