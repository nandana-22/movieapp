import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Typography, Box, Tooltip
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/block`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, isBlocked: true } : user
        )
      );
    } catch (err) {
      console.error('Error blocking user:', err);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/unblock`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, isBlocked: false } : user
        )
      );
    } catch (err) {
      console.error('Error unblocking user:', err);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#111', minHeight: '100vh', padding: 3, color: 'white' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        👤 Admin User Management
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}><strong>Email</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Status</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                <TableCell sx={{ color: user.isBlocked ? 'tomato' : 'lightgreen' }}>
                  {user.isBlocked ? '🚫 Blocked' : '🟢 Active'}
                </TableCell>
                <TableCell>
                  <Tooltip title="Block User">
                    <IconButton
                      onClick={() => handleBlock(user._id)}
                      color={user.isBlocked ? 'default' : 'error'}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Unblock User">
                    <IconButton
                      onClick={() => handleUnblock(user._id)}
                      color={user.isBlocked ? 'success' : 'default'}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: 'gray' }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
