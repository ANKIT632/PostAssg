/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash,FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PostItem = ({post,setDeleteSatus,token,userId}) => {
  console.log(post);

  const navigate = useNavigate();

  const handleDelete = async () => {
   
   
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteSatus(post._id);
      console.log('Post deleted successfully');
  
    } catch (error) {
      console.error('There was an error deleting the post!', error);
    }
  };

  const handleUpdate = () => {
    localStorage.setItem('postContent', JSON.stringify(post));
    navigate('/update-post')
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 w-[]  p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-scroll-y relative" 
    >
      <motion.h2
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
       
        {post?.title}
      </motion.h2>
      <motion.p
        className="text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
       {post?.content}
      </motion.p>
      <motion.p
        className="text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Author: {post.author.username}
      </motion.p>

      {post.author._id===userId&&<><button onClick={handleUpdate} className="absolute bottom-4 right-10 text-blue-500 hover:text-blue-700 active:text-blue-500  transition-colors duration-400 cursor-pointer border-r pr-2">
          <FaEdit />
        </button>
        
        <button
        onClick={handleDelete}
        className="absolute bottom-4 right-4 text-red-500 hover:text-red-700 active:text-red-500  transition-colors duration-400 cursor-pointer"
      >
        <FaTrash size={16} />
      </button></>
        }

      
    </motion.div>
  );
};

export default PostItem;