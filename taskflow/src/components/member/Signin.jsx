import React, { useState, useEffect } from 'react';
import {
  Box, Stack, Button, MenuItem, Select,
  InputLabel, FormControl, TextField
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
    axios.get('http://localhost:4000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const filtered = users.filter(u =>
    u.role?.trim().toLowerCase() === role.toLowerCase()
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ marginBottom: 50, fontFamily: 'Georgia' }}>TaskFlow</h1>
      <Stack spacing={3} sx={{ width: 300 }}>

        <FormControl fullWidth>
          <InputLabel>Select Role</InputLabel>
          <Select
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
            <InputLabel>Select User</InputLabel>
            <Select
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
          disabled={!role || !userId || !email}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default Signin;
