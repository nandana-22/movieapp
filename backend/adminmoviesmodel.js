const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  image: String,
  shortdesc: String,
  longdesc: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Fix: Avoid OverwriteModelError
module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
