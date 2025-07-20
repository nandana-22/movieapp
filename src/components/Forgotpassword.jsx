import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email || !newPassword) {
      alert("Please enter both email and new password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <Box
        component={Paper}
        elevation={3}
        style={{
          padding: 24,
          borderRadius: 12,
          minWidth: 350,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter your email and new password.
        </Typography>

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
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleReset}
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' }
          }}
        >
          {loading ? 'Sending...' : 'Reset Password'}
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Remembered your password?{' '}
          <Link href="/login" underline="always" sx={{ color: '#1976d2' }}>
            Go to Login
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Forgotpassword;
