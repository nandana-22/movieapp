import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

const stats = [
  { label: 'Movies', count: 124, icon: <MovieIcon fontSize="large" color="primary" />, bgColor: '#6A1B9A', category: 'content', details: 'Total movies in the database: 124' },
  { label: 'Users', count: 587, icon: <PeopleIcon fontSize="large" color="secondary" />, bgColor: '#43A047', category: 'people', details: 'Registered users: 587' },
  { label: 'Reviews', count: 1432, icon: <RateReviewIcon fontSize="large" color="error" />, bgColor: '#E53935', category: 'content', details: 'Total reviews: 1432' },
  { label: 'Likes', count: 2000, icon: <ThumbUpIcon fontSize="large" color="primary" />, bgColor: '#FB8C00', category: 'interaction', details: 'Total likes on reviews: 2000' },
  { label: 'Comments', count: 900, icon: <CommentIcon fontSize="large" color="info" />, bgColor: '#3949AB', category: 'interaction', details: 'Total comments: 900' },
];

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [filter, setFilter] = useState('all');
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate(); // ✅

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };
    fetchMovies();
  }, []);

  const handleClickOpen = (stat) => {
    if (stat.label === 'Users') {
      navigate('/admin/users'); // ✅ navigate to route instead of rendering manually
    } else {
      setSelectedStat(stat);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStat(null);
  };

  const filteredStats = filter === 'all' ? stats : stats.filter(stat => stat.category === filter);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" color="#333">
        Welcome to the Admin Dashboard
      </Typography>

      <Box sx={{ width: 200, mb: 4, mx: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="content">Content</MenuItem>
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="interaction">Interaction</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        {filteredStats.map(({ label, count, icon, bgColor, details }) => (
          <Card
            key={label}
            sx={{
              minWidth: 150,
              textAlign: 'center',
              p: 2,
              backgroundColor: bgColor,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              },
              color: 'white',
            }}
            onClick={() => handleClickOpen({ label, details })}
          >
            <CardContent>
              {icon}
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {count}
              </Typography>
              <Typography>{label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6, px: 3 }}>
        <Typography variant="h6" gutterBottom color="#333" fontWeight="medium">
          Recent Movies
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            py: 1,
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie._id}
              sx={{
                width: 150,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardMedia
                component="img"
                height="225"
                image={movie.posterUrl}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.releaseYear}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedStat?.label} Details</DialogTitle>
        <DialogContent>
          <Typography>{selectedStat?.details}</Typography>
          <Box mt={2}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Admin;
