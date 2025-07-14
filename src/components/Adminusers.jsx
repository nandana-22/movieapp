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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)',
        p: 4,
        width: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
        👤 Admin User Management
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
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
                <TableCell colSpan={3} align="center">
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
