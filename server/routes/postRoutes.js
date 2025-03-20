// routes/postRoutes.js
const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;