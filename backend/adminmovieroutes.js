const express = require('express');
const router = express.Router();
const Movie = require('./adminmoviesmodel');

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies', error: err.message });
  }
});

// POST a new movie ✅ trailer & genre included
router.post('/', async (req, res) => {
  try {
    const { title, date, image, shortdesc, longdesc, trailer, genre } = req.body;
    const newMovie = new Movie({ title, date, image, shortdesc, longdesc, trailer, genre });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add movie', error: err.message });
  }
});

// DELETE a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete movie', error: err.message });
  }
});

// PUT (edit/update) a movie by ID ✅ trailer & genre included
router.put('/:id', async (req, res) => {
  try {
    const { title, date, image, shortdesc, longdesc, trailer, genre } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, date, image, shortdesc, longdesc, trailer, genre },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie updated successfully', movie: updatedMovie });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update movie', error: err.message });
  }
});

module.exports = router;
