import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import isAuthenticated from '../utils/auth';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/posts')
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(()=>{
    if(!isAuthenticated()){
      navigate('/')   
    }
   },[])

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={handleBack}
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;