// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { FaUserCircle } from 'react-icons/fa'; // Import icon

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');
    const adminName = localStorage.getItem('adminName');
    const navRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');
        window.location.reload(); // Untuk me-refresh halaman setelah logout
    };

    const headerSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-100%)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    });

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <animated.header style={headerSpring} className="bg-transparent absolute top-0 left-0 w-full z-10 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">Virtual Tour</Link>
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
                <nav ref={navRef} className={`lg:flex items-center lg:space-x-4 ${isOpen ? 'block' : 'hidden'} absolute lg:relative top-0 left-0 w-full lg:w-auto bg-black lg:bg-transparent p-4 lg:p-0`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
                        <Link to="/" className="text-white hover:underline">Home</Link>
                        <Link to="/tours" className="text-white hover:underline">Tours</Link>
                        {isLoggedIn ? (
                            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2 space-y-4 lg:space-y-0">
                                <Link to="/admin/dashboard" className="text-white">
                                    <FaUserCircle size={24} />
                                </Link>
                                <span className="text-white">Hello, {adminName}</span>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Logout</button>
                            </div>
                        ) : (
                            <Link to="/admin/login" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded">Login</Link>
                        )}
                    </div>
                </nav>
            </div>
        </animated.header>
    );
};

export default Header;
