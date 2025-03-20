import React from 'react';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';
import isAuthenticated from '../utils/auth'

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      
        localStorage.removeItem('token');
     
        navigate('/login');
    };


    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-600 p-4 shadow-md sticky top-0 z-40"
        >
            <div className="container mx-auto flex justify-between items-center ">
                <motion.div
                    className="text-white text-2xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Assignment
                </motion.div>
                <motion.ul
                    className="flex space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <motion.li
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">Source Code</a>
                    </motion.li>

                    <motion.li
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                    >
                        <a
                            href="https://www.linkedin.com/in/ankit-kumar-gupta-69537b228/?trk=opento_sprofile_details"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Contact Us</a>
                    </motion.li>

                  
                    { isAuthenticated() && <motion.button
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleLogout}
                        >
                            Logout
                        </motion.button>}
                   
                </motion.ul>
            </div>
        </motion.nav>
    );
};

export default NavBar;