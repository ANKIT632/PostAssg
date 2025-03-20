import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log(response);
      if (response.status==200) {
        localStorage.setItem('token', response.data.token);
        navigate('/posts');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Login failed');
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[90%] min-sm:w-[25rem]">
        <motion.h2
          className="text-2xl font-bold mb-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          LogIn
        </motion.h2>
        
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          className="outline-none border-b-2 border-gray-300 focus:border-blue-500 transition duration-300 w-full mb-4 p-2"
          onChange={(e) => setEmail(e.target.value)}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          className="outline-none border-b-2 border-gray-300 focus:border-blue-500 transition duration-300 w-full mb-4 p-2"
          onChange={(e) => setPassword(e.target.value)}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LogIn
        </motion.button>
        <motion.div
          className="text-center mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gray-600">I have not an account? </span>
          <Link to="/" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Login;