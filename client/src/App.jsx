// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/SignUp';
import PostForm from './components/PostForm';
import Post from './page/Post';
import Login from './components/Login';
import NavBar from './components/NavBar';
import UpdatePost from './components/UpdatePost'


function App() {
  return (

    <Router>
      <div className="App">
      <NavBar/>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/posts" element={<Post/>} />
          <Route path="/create-post" element={<PostForm/>} />
          <Route path='/update-post' element={<UpdatePost/>}/>
          <Route path='*' element={<div className='text-lg text-center'>Page not found</div>}/>
        </Routes>
      </div>
      </Router>

  );
}

export default App;