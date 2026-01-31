/**
 * Week 9 Session 17: MongoDB Relationships
 * Main server file
 */

require('dotenv').config();

const express = require('express');
const { connectDB } = require('./db/connection');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// === USER ROUTES ===

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('postCount');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user with posts
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'posts',
        options: { sort: { createdAt: -1 } }
      });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// === POST ROUTES ===

// Get all posts with author
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate('author', 'username displayName')
      .populate('commentCount')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post with comments
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username displayName')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username displayName' },
        options: { sort: { createdAt: -1 } }
      });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create post
app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    
    const populated = await Post.findById(post._id)
      .populate('author', 'username displayName');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// === COMMENT ROUTES ===

// Add comment to post
app.post('/api/posts/:postId/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const comment = new Comment({
      ...req.body,
      post: req.params.postId
    });
    await comment.save();
    
    const populated = await Comment.findById(comment._id)
      .populate('author', 'username displayName');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
