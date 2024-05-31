// src/components/Footer.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Footer = () => {
    const footerSpring = useSpring({
        from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        config: { mass: 1, tension: 280, friction: 60 }
    });

    return (
        <animated.footer style={footerSpring} className="bg-blue-500 text-white py-6 mt-8">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; 2024 Virtual Tour Wisata. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-facebook"></i> Facebook
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-instagram"></i> Instagram
                    </a>
                </div>
                <p>Follow us on social media for the latest updates.</p>
            </div>
        </animated.footer>
    );
};

export default Footer;
