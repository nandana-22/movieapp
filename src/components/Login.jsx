import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from '@mui/material';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token); // Adjust 'data.token' if your backend uses a different key
        setIsLoggedIn(true);
        alert("Login successful!");
        navigate('/home');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #1c1c1c, #2c3e50)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 4,
          width: '90%',
          maxWidth: 400,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#1c1c1c' }}
        >
          Login to MovieHub
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color="primary"
          margin="normal"
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="primary"
          margin="normal"
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' }
          }}
        >
          LOGIN
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }} align="center">
          <Link href="#" underline="hover" sx={{ color: '#1976d2' }}>
            Forgot Password?
          </Link>
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }} align="center">
          Don’t have an account?{' '}
          <Link href="/signup" underline="hover" sx={{ color: '#1976d2' }}>
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
