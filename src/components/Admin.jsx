import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Box, Card, CardMedia, CardContent, Typography, Dialog,
  DialogTitle, DialogContent, Button, Select, MenuItem,
  InputLabel, FormControl
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import AdminUsers from './Adminusers';

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [filter, setFilter] = useState('all');
  const [movies, setMovies] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState('dashboard');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/movies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(res.data.length);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchMovies();
    fetchUsers();
  }, []);

  const handleClickOpen = (stat) => {
    if (stat.label === 'Users') {
      setSelectedPage('users');
    } else if (stat.label === 'Movies') {
      navigate('/admin/movies');
    } else {
      setSelectedStat(stat);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStat(null);
  };

  const stats = [
    { label: 'Movies', count: movies.length, icon: <MovieIcon fontSize="large" color="primary" />, bgColor: '#6A1B9A', category: 'content', details: `Total movies in the database: ${movies.length}` },
    { label: 'Users', count: userCount, icon: <PeopleIcon fontSize="large" color="secondary" />, bgColor: '#43A047', category: 'people', details: `Registered users: ${userCount}` },
    { label: 'Reviews', count: 1432, icon: <RateReviewIcon fontSize="large" color="error" />, bgColor: '#E53935', category: 'content', details: 'Total reviews: 1432' },
    { label: 'Likes', count: 2000, icon: <ThumbUpIcon fontSize="large" color="primary" />, bgColor: '#FB8C00', category: 'interaction', details: 'Total likes on reviews: 2000' },
    { label: 'Comments', count: 900, icon: <CommentIcon fontSize="large" color="info" />, bgColor: '#3949AB', category: 'interaction', details: 'Total comments: 900' },
  ];

  const filteredStats = filter === 'all' ? stats : stats.filter(stat => stat.category === filter);

  if (selectedPage === 'users') return <AdminUsers />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" color="#333">
        Welcome to the Admin Dashboard
      </Typography>

      <Box sx={{ width: 200, mb: 4 }}>
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
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
