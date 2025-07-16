const express = require('express');
const router = express.Router();
const Movie = require('./adminmoviesmodel'); // Using same model as admin

// GET /api/movielist — Fetch movies for home page
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }); // latest first
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies', error: err.message });
  }
});

module.exports = router;
