const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String }, // e.g., "July 21, 2023"
  image: { type: String }, // Poster URL
  shortdesc: { type: String },
  longdesc: { type: String },
  trailer: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
