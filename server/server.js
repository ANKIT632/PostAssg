// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;




app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/Assgn')
  .then(() => {
    console.log('db connect');
    
  })
  .catch(err => {
    console.error('Connection error', err);
  });


  app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
  });