/**
 * Week 10 Session 20: File Uploads
 * Main server file
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const { generateToken } = require('./middleware/auth');
const { uploadAvatar, uploadImage, handleUploadError } = require('./middleware/upload');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/file-uploads')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ username, email, password, displayName });
    await user.save();
    
    const token = generateToken({ userId: user._id, username: user.username });
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken({ userId: user._id, username: user.username });
    
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload avatar (requires auth)
app.post('/api/users/avatar', 
  auth, 
  uploadAvatar.single('avatar'), 
  handleUploadError,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Update user's avatar path
      user.avatar = `/uploads/${req.file.filename}`;
      await user.save();
      
      res.json({
        message: 'Avatar uploaded successfully',
        avatar: user.avatar,
        user
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Upload general image (requires auth)
app.post('/api/upload/image',
  auth,
  uploadImage.single('image'),
  handleUploadError,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  }
);

// Get current user profile
app.get('/api/users/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
