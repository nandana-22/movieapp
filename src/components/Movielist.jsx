import React, { useEffect, useState } from 'react';
import {
  Typography, Grid, Box, Button, Stack
} from '@mui/material';
import Moviecard from './Moviecard';
import axios from 'axios';

const genres = ['All', 'Family', 'Romance', 'Action', 'Thriller', 'Comedy', 'Drama', 'Fantasy'];

const Movielist = () => {
  const [movies, setMovies] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState('All');

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

  const filteredMovies = filteredGenre === 'All'
    ? movies
    : movies.filter((movie) => movie.genre === filteredGenre);

  return (
    <Box
      sx={{
        backgroundColor: '#141414',
        minHeight: '100vh',
        padding: { xs: '2rem 1rem', md: '3rem 4rem' },
        color: 'white',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 3
        }}
      >
        🎬 Browse by Genre
      </Typography>

      {/* Genre Filter */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        mb={4}
      >
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={filteredGenre === genre ? 'contained' : 'outlined'}
            onClick={() => setFilteredGenre(genre)}
            sx={{
              borderRadius: 50,
              textTransform: 'capitalize',
              fontWeight: 600,
              px: 3,
              py: 1,
              color: filteredGenre === genre ? '#000' : '#fff',
              backgroundColor: filteredGenre === genre ? '#fff' : 'transparent',
              borderColor: '#fff',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#000',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {genre}
          </Button>
        ))}
      </Stack>

      {/* Movie Cards */}
      <Grid container spacing={4} justifyContent="center">
        {filteredMovies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Moviecard {...movie} />
          </Grid>
        ))}
      </Grid>

      {/* No Movies Message */}
      {filteredMovies.length === 0 && (
        <Typography align="center" sx={{ mt: 4, color: 'gray' }}>
          No movies found in this genre.
        </Typography>
      )}
    </Box>
  );
};

export default Movielist;
