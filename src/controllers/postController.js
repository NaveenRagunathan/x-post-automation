const db = require('../models/database');
const { postTweet } = require('../utils/twitter');
const schedule = require('node-schedule');

// Store active schedules
const activeSchedules = new Map();

// Prepare SQL statements
const insertPost = db.prepare(`
    INSERT INTO posts (content, scheduled_time, status)
    VALUES (?, ?, 'scheduled')
`);

const getAllPosts = db.prepare(`
    SELECT * FROM posts
    ORDER BY scheduled_time ASC
`);

const updatePost = db.prepare(`
    UPDATE posts
    SET content = ?, scheduled_time = ?, status = 'scheduled', updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
`);

const deletePost = db.prepare(`
    DELETE FROM posts
    WHERE id = ?
`);

const updatePostStatus = db.prepare(`
    UPDATE posts
    SET status = ?
    WHERE id = ?
`);

// Create a new scheduled post
function createPost(req, res) {
    const { content, scheduled_time } = req.body;
    
    if (!content || !scheduled_time) {
        return res.status(400).json({ error: 'Content and scheduled_time are required' });
    }

    const scheduledDate = new Date(scheduled_time);
    if (isNaN(scheduledDate.getTime())) {
        return res.status(400).json({ error: 'Invalid scheduled_time format' });
    }

    try {
        const result = insertPost.run(content, scheduled_time);
        const postId = result.lastInsertRowid;
        
        schedulePost(postId, content, scheduledDate);
        
        res.status(201).json({
            id: postId,
            content,
            scheduled_time,
            status: 'scheduled'
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
}

// Get all scheduled posts
function getPosts(req, res) {
    try {
        const posts = getAllPosts.all();
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Failed to get posts' });
    }
}

// Update a scheduled post
function updatePostHandler(req, res) {
    const { id } = req.params;
    const { content, scheduled_time } = req.body;

    if (!content || !scheduled_time) {
        return res.status(400).json({ error: 'Content and scheduled_time are required' });
    }

    const scheduledDate = new Date(scheduled_time);
    if (isNaN(scheduledDate.getTime())) {
        return res.status(400).json({ error: 'Invalid scheduled_time format' });
    }

    // Cancel existing schedule if it exists
    if (activeSchedules.has(id)) {
        activeSchedules.get(id).cancel();
        activeSchedules.delete(id);
    }

    try {
        const result = updatePost.run(content, scheduled_time, id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        schedulePost(id, content, scheduledDate);
        res.json({
            id,
            content,
            scheduled_time,
            status: 'scheduled'
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
}

// Delete a scheduled post
function deletePostHandler(req, res) {
    const { id } = req.params;

    // Cancel existing schedule if it exists
    if (activeSchedules.has(id)) {
        activeSchedules.get(id).cancel();
        activeSchedules.delete(id);
    }

    try {
        const result = deletePost.run(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
}

// Schedule a post for publishing
function schedulePost(id, content, scheduledDate) {
    const job = schedule.scheduleJob(scheduledDate, async () => {
        try {
            // Update status to 'posting'
            updatePostStatus.run('posting', id);

            // Post the tweet
            const result = await postTweet(content);
            
            // Update status based on result
            const status = result ? 'posted' : 'failed';
            updatePostStatus.run(status, id);
            
            // Remove from active schedules
            activeSchedules.delete(id);
        } catch (error) {
            console.error(`Error posting tweet ${id}:`, error);
            updatePostStatus.run('failed', id);
            activeSchedules.delete(id);
        }
    });

    activeSchedules.set(id, job);
}

module.exports = {
    createPost,
    getPosts,
    updatePost: updatePostHandler,
    deletePost: deletePostHandler
}; 