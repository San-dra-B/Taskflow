import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', completed: 60, pending: 35 },
  { month: 'Feb', completed: 70, pending: 45 },
  { month: 'Apr', completed: 72, pending: 50 },
  { month: 'May', completed: 75, pending: 52 },
];

const DashBoard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Project Tasks Tracker</Typography>
      <Typography variant="h6" gutterBottom>Welcome, Admin</Typography>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography>Total Tasks</Typography>
              <Typography variant="h5" fontWeight="bold">120</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography>Completed Tasks</Typography>
              <Typography variant="h5" fontWeight="bold">80</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <Typography>Pending Tasks</Typography>
              <Typography variant="h5" fontWeight="bold">40</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select defaultValue="OpenWings" label="Project">
              <MenuItem value="OpenWings">OpenWings</MenuItem>
              <MenuItem value="NovaTask">NovaTask</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Team Member</InputLabel>
            <Select defaultValue="All" label="Team Member">
              <MenuItem value="All">All Members</MenuItem>
              <MenuItem value="Sneha">Sneha</MenuItem>
              <MenuItem value="Anya Paul">Anya Paul</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Task Progress</Typography>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#3f51b5" name="Completed Tasks" />
        <Bar dataKey="pending" fill="#f06292" name="Pending Tasks" />
      </BarChart>
    </Box>
  );
};

export default DashBoard;
