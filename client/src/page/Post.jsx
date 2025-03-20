import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import PostItem from '../components/PostItems';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import isAuthenticated from '../utils/auth';

const PostList = () => {

  const navigate=useNavigate();

  
  const token = localStorage.getItem('token');
  let decodedToken = ""
  if(token!==null )
  { decodedToken=jwtDecode (token);}

  const [posts, setPosts] = useState();
  const [deleteStatus,setDeleteSatus]=useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(()=>{
   
    if(!isAuthenticated()){
      
      navigate('/')   
    }
   },[token])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/api/posts/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { page, limit }
      });
      console.log(response);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages); // Assuming the API returns total pages
    };
    fetchPosts();
  }, [page, limit, deleteStatus]);


 

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddPost=()=>{
  navigate('/create-post')
  }

 

  return (
    <div className="relative flex flex-col  items-center h-full">
      <motion.div
        className="grid  max-xs:grid-cols-1 md:w-[70%]   gap-6 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts?.map((post, idx) => (
          <PostItem key={idx} post={post} setDeleteSatus={setDeleteSatus} token={token} userId={decodedToken.userId}/>
        ))}
      </motion.div>

      <button
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer" 
        onClick={()=>handleAddPost()}
      >
        <FaPlus />
      </button>

    
      {totalPages >= 1 && (
  <div className="pagination-buttons flex justify-center my-4 self-bottom">
    {Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isCurrentPage = page === pageNumber;
      const isFirstPage = pageNumber === 1;
      const isLastPage = pageNumber === totalPages;
      const isNearCurrentPage = Math.abs(page - pageNumber) <= 2;

      if (isFirstPage || isLastPage || isNearCurrentPage) {
        return (
          <motion.button
            key={pageNumber}
            className={` cursor-pointer mx-1 px-3 py-1 rounded ${isCurrentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </motion.button>
        );
      }
      else{
       return <span key={index}>...</span>
      }

   
    })}
  </div>
)}
    </div>
  );
};

export default PostList;