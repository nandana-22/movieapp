import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

const Signupp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ setup navigate

  const handleSignupp = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login'); // ✅ redirect to login
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          minWidth: 350,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Create an Account
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

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
          variant="contained"
          fullWidth
          onClick={handleSignupp}
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' }
          }}
        >
          {loading ? 'Signing up...' : 'SIGN UP'}
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" underline="always" sx={{ color: '#1976d2' }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signupp;
