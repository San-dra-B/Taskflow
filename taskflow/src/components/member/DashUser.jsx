import React, { useState, useEffect } from 'react';
import {
  Box, CssBaseline, Toolbar, AppBar, Typography
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebaruser from './SidebarUser';

const DashUser = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(' Error fetching tasks:', err));
  }, []);

  if (!currentUser) return null; 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            USER DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebaruser />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet context={{ tasks, setTasks, currentUser }} />
      </Box>
    </Box>
  );
};

export default DashUser;
