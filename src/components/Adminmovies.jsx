import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/movies', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies(response.data || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleDelete = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEditClick = (movie) => {
    setEditMovie({ ...movie });
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditMovie({ title: '', date: '', image: '', shortdesc: '', longdesc: '' });
    setOpen(true);
  };

  const handleChange = (e) => {
    setEditMovie({ ...editMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editMovie._id) {
        // Update existing movie
        await axios.put(`http://localhost:5000/api/admin/movies/${editMovie._id}`, editMovie, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new movie
        await axios.post('http://localhost:5000/api/admin/movies', editMovie, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpen(false);
      fetchMovies();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">All Movies</Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Movie
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000, tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Poster</strong></TableCell>
              <TableCell><strong>Short Description</strong></TableCell>
              <TableCell><strong>Long Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>
                  {movie.date
                    ? new Date(movie.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <img
                    src={
                      movie.image.includes('themoviedb.org/t/p/')
                        ? movie.image.replace(
                            'www.themoviedb.org/t/p/original',
                            'image.tmdb.org/t/p/w500'
                          )
                        : movie.image
                    }
                    alt={movie.title}
                    style={{
                      width: '80px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: 4
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x120?text=No+Image';
                    }}
                  />
                </TableCell>
                <TableCell>{movie.shortdesc}</TableCell>
                <TableCell>{movie.longdesc}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(movie)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(movie._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reused Dialog for Add/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editMovie?._id ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={editMovie?.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date (YYYY-MM-DD)"
            name="date"
            value={editMovie?.date || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Image URL"
            name="image"
            value={editMovie?.image || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Short Description"
            name="shortdesc"
            value={editMovie?.shortdesc || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Long Description"
            name="longdesc"
            value={editMovie?.longdesc || ''}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMovie?._id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminMovies;
