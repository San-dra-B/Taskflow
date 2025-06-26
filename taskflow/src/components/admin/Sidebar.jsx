import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Drawer, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => (
  <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashadmin">
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashadmin/projects">
        <ListItemIcon><WorkIcon /></ListItemIcon>
        <ListItemText primary="Projects" />
        </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashadmin/tasks">
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Tasks" />
        </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashadmin/team">
        <ListItemIcon><GroupIcon /></ListItemIcon>
        <ListItemText primary="Team" />
        </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
      
    </Box>
  </Drawer>
);

export default Sidebar;