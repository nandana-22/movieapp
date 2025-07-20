import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Box, Card, CardContent, Typography, Dialog,
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
  {
    label: 'Movies',
    count: movies.length,
    icon: <MovieIcon fontSize="large" />,
    bgColor: '#d32f2f',
    category: 'content',
    details: `Total movies in the database: ${movies.length}`
  },
  {
    label: 'Users',
    count: userCount,
    icon: <PeopleIcon fontSize="large" />,
    bgColor: '#1976d2',
    category: 'people',
    details: `Registered users: ${userCount}`
  }
];


  const filteredStats = filter === 'all' ? stats : stats.filter(stat => stat.category === filter);

  if (selectedPage === 'users') return <AdminUsers />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        🎬 Admin Dashboard
      </Typography>

      <Box sx={{ width: 200, mb: 4 }}>
        <FormControl fullWidth variant="filled">
          <InputLabel sx={{ color: '#ccc' }}>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              color: 'white',
              backgroundColor: '#263238',
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
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
        }}
      >
        {filteredStats.map(({ label, count, icon, bgColor, details }) => (
          <Card
            key={label}
            sx={{
              minWidth: 180,
              maxWidth: 250,
              textAlign: 'center',
              p: 2,
              background: bgColor,
              cursor: 'pointer',
              borderRadius: 3,
              color: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 30px rgba(0,0,0,0.7)',
              },
            }}
            onClick={() => handleClickOpen({ label, details })}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                {icon}
              </Box>
              <Typography variant="h5" fontWeight="bold">{count}</Typography>
              <Typography>{label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Details Dialog */}
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
