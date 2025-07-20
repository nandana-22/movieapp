import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from '@mui/material';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success | error | warning
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage('');
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setMessageType('success');
        setMessage('✅ Login successful!');
        setTimeout(() => navigate('/home'), 1000); // redirect after short delay
      } else {
        if (response.status === 403) {
          setMessageType('error');
          setMessage('❌ Your account is blocked.');
        } else if (response.status === 401) {
          setMessageType('warning');
          setMessage('⚠️ Invalid email or password.');
        } else {
          setMessageType('error');
          setMessage(data.message || 'Something went wrong!');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessageType('error');
      setMessage("⚠️ Server error. Please try again.");
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

        {message && (
          <Alert severity={messageType} sx={{ mt: 2, mb: 2 }}>
            {message}
          </Alert>
        )}

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          <Link
            component="button"
            onClick={() => navigate('/forgot-password')}
            underline="hover"
            sx={{ color: '#1976d2' }}
          >
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
