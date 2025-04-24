const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a new scheduled post
router.post('/', postController.createPost);

// Get all scheduled posts
router.get('/', postController.getPosts);

// Update a scheduled post
router.put('/:id', postController.updatePost);

// Delete a scheduled post
router.delete('/:id', postController.deletePost);

module.exports = router; 