// src/components/SearchComponent.js
import React from 'react';

const SearchComponent = ({ onSearch }) => {
    return (
        <div className="my-4 mx-auto w-full max-w-xl">
            <input
                type="text"
                placeholder="Search tours..."
                onChange={e => onSearch(e.target.value)}
                className="form-input px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
        </div>
    );
};

export default SearchComponent;