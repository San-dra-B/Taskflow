import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';

import Sidebar from './Sidebar';

const drawerWidth = 240;


const initialTasks = [
  {
    id: 101,
    title: 'Design homepage',
    description: 'Create modern layout',
    dueDate: '2025-06-30',
    assignedTo: '1',
    project: 'a',
    status: 'To Do',
    comment: ''
  },
  {
    id: 102,
    title: 'Social media plan',
    description: 'Outline 3-month strategy',
    dueDate: '2025-07-10',
    assignedTo: '2',
    project: 'b',
    status: 'In Progress',
    comment: ''
  }
];

const DashAdmin = () => {
  const [tasks, setTasks] = useState(initialTasks); 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            ADMIN DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet context={{ tasks, setTasks }} />
      </Box>
    </Box>
  );
};

export default DashAdmin;