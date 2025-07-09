import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Typography, Box, Tooltip
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      _id: '1',
      email: 'john@example.com',
      isActive: true,
      isBlocked: false,
      moviesCount: 3
    },
    {
      _id: '2',
      email: 'sarah@example.com',
      isActive: false,
      isBlocked: true,
      moviesCount: 1
    },
    {
      _id: '3',
      email: 'alex@example.com',
      isActive: true,
      isBlocked: false,
      moviesCount: 5
    }
  ]);

  const handleBlock = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user._id === userId ? { ...user, isBlocked: true } : user
      )
    );
  };

  const handleUnblock = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user._id === userId ? { ...user, isBlocked: false } : user
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        👤 Admin User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Movies Uploaded</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isActive ? '🟢 Active' : '🔴 Inactive'}
                </TableCell>
                <TableCell>{user.moviesCount}</TableCell>
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
                <TableCell colSpan={4} align="center">
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
