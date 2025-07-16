const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route Imports
const adminRoutes = require('./adminroutes');
const userRoutes = require('./userroutes');
const adminMoviesRoutes = require('./adminmovieroutes');
const movieRoutes = require('./movieroutes');

// ✅ Correct Route Mounting
          // 🟢 user login/register/reset-password
app.use('/api/user', userRoutes);                 // (optional alias for future)
app.use('/api/movies', movieRoutes);              // 🟢 public movie routes (homepage, etc.)
app.use('/api/admin/movies', adminMoviesRoutes);  // 🔒 admin-only movie CRUD
app.use('/api/admin', adminRoutes);               // 🔒 admin login + user mgmt

// Root Route
app.get('/', (req, res) => {
  res.send('🎬 Movie App Backend is running!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
