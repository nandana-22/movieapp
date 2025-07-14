import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import Moviecard from './Moviecard';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to MovieHub
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Discover, Share, and Enjoy the Latest Movies
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Latest Movies
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Moviecard {...movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieList;
