const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('./admincredentials');
const User = require('./adminusersmodel');
const Movie = require('./adminmoviesmodel');

// ✅ Middleware: Verify JWT
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Middleware: Check Admin Role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

//
// 🔐 Admin Login route (before auth middleware)
//
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//
// 🔒 Protected Routes Below
//
router.use(auth, requireAdmin);

//
// 🎬 Movies
//
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/movies', async (req, res) => {
  try {
    const { title, date, image, shortdesc, longdesc, trailer } = req.body;
    const movie = new Movie({ title, date, image, shortdesc, longdesc, trailer });
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/movies/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
// 👥 Users
//
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// ✅ Updated: Block user
router.put('/users/:id/block', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
    res.json({ message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ message: 'Error blocking user', error: err.message });
  }
});

// ✅ Updated: Unblock user
router.put('/users/:id/unblock', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
    res.json({ message: 'User unblocked' });
  } catch (err) {
    res.status(500).json({ message: 'Error unblocking user', error: err.message });
  }
});

module.exports = router;
