import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Button, MenuItem, Select,
  InputLabel, FormControl, TextField, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/teams')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching team members:", err));
  }, []);

  const filtered = users.filter(u =>
    u.role?.trim().toLowerCase() === (role === 'member' ? 'team-member' : 'admin')
  );

  const selectedUser = filtered.find(u => u._id === userId);

  const handleLogin = () => {
    if (selectedUser && selectedUser.email === email.trim()) {
      localStorage.setItem('loggedInUser', JSON.stringify(selectedUser));
      navigate(role === 'admin' ? '/dashadmin' : '/dashuser');
    } else {
      alert("Invalid email for selected user");
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e3f2fd, #d0e3ff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      px: 2
    }}>
     
      <Box sx={{
        position: 'absolute',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, #5db6ff, #1d75c9)',
        borderRadius: '50%',
        top: 50,
        left: -120,
        zIndex: 0,
        opacity: 0.35
      }} />
      <Box sx={{
        position: 'absolute',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, #4ab8ff, #1669bc)',
        borderRadius: '40%',
        bottom: -100,
        right: -140,
        zIndex: 0,
        opacity: 0.35
      }} />
      <Box sx={{
        position: 'absolute',
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, #4bc7ff, #1a7acb)',
        borderRadius: '50%',
        top: 150,
        right: 100,
        zIndex: 0,
        opacity: 0.3
      }} />
      <Box sx={{
        position: 'absolute',
        width: 180,
        height: 180,
        background: 'radial-gradient(circle, #75dbff, #238dd2)',
        borderRadius: '40%',
        bottom: 80,
        left: 70,
        zIndex: 0,
        opacity: 0.3
      }} />
      <Box sx={{
        position: 'absolute',
        width: 250,
        height: 250,
        background: 'radial-gradient(circle, #609df2, #215ecf)',
        borderRadius: '60%',
        top: -60,
        right: -60,
        zIndex: 0,
        opacity: 0.28
      }} />

      
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: 3,
        width: '100%',
        maxWidth: 380,
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1
      }}>
        <img
          src="/mytask.jpg"
          alt="TaskFlow Logo"
          style={{
            height: 50,
            width: 200,
            marginBottom: 12,
            borderRadius: 12,
            objectFit: 'contain'
          }}
        />
       
        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
          Manage your tasks smartly
        </Typography>

        <Stack spacing={2} mt={2}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setUserId('');
                setEmail('');
              }}
              label="Select Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="member">Team Member</MenuItem>
            </Select>
          </FormControl>

          {role && (
            <FormControl fullWidth>
              <InputLabel id="user-label">Select User</InputLabel>
              <Select
                labelId="user-label"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setEmail('');
                }}
                label="Select User"
              >
                {filtered.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {userId && (
            <TextField
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#6c63ff',
              '&:hover': { backgroundColor: '#584bd3' },
              fontWeight: 'bold'
            }}
            disabled={!role || !userId || !email}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signin;
