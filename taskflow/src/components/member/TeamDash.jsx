import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Paper, LinearProgress, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import axios from 'axios';

const TeamDash = () => {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!currentUser?.name) return;

    axios.get('http://localhost:4000/tasks')
      .then(res => {
        const allTasks = res.data || [];
        const userTasks = allTasks
          .filter(task => task.assignedTo === currentUser.name)
          .map(task => ({
            ...task,
            status: task.status || 'To Do'
          }));
        setTasks(userTasks);
      })
      .catch(err => console.error('Error loading tasks', err));
  }, [currentUser]);

  const total = tasks.length;
  const done = tasks.filter(t => t.status?.toLowerCase() === 'done' || t.status?.toLowerCase() === 'completed').length;
  const inProgress = tasks.filter(t => t.status?.toLowerCase() === 'in progress').length;
  const toDo = total - done - inProgress;

  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Welcome, {currentUser?.name || 'Team Member'}
      </Typography>

      {/* Progress Overview Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Total Tasks" value={total} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="To Do" value={toDo} color="#f9a825" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="In Progress" value={inProgress} color="#0288d1" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard title="Completed" value={done} color="#43a047" />
        </Grid>
      </Grid>

      {/* Progress Bar */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Overall Progress</Typography>
        <Typography>{done} of {total} tasks completed</Typography>
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={percent} />
          <Typography variant="caption">{percent}% Complete</Typography>
        </Box>
      </Paper>

      {/* Task List */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>Your Tasks</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Project</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.project?.title || '—'}</TableCell>
                  <TableCell>{task.dueDate || '—'}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No tasks assigned to you.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const InfoCard = ({ title, value, color }) => (
  <Paper elevation={3} sx={{ p: 2, backgroundColor: color, color: '#fff', borderRadius: 2 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
);

export default TeamDash;
