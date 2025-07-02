import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid,
  IconButton, Menu, MenuItem, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, FormControl, InputLabel, Select, Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks').then(res => setTasks(res.data));
    axios.get('http://localhost:4000/users').then(res => setMembers(res.data));
    axios.get('http://localhost:4000/projects').then(res => setProjects(res.data));
  }, []);

  const filteredTasks = tasks.filter(task =>
    (!selectedProject || task.project?._id === selectedProject) &&
    (!selectedMember || task.assignedTo === selectedMember)
  );

  const completedStatuses = ['Done', 'Completed'];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => completedStatuses.includes(t.status)).length;
  const pendingTasks = totalTasks - completedTasks;

  const getProjectTitle = id => projects.find(p => p._id === id)?.title || 'Unknown';
  const getMemberName = id => members.find(m => m._id === id || m.name === id)?.name || id;

  const chartData = projects.map(project => {
    const relatedTasks = tasks.filter(t =>
      t.project === project._id || t.project?._id === project._id
    );
    const completed = relatedTasks.filter(t => completedStatuses.includes(t.status)).length;
    const pending = relatedTasks.length - completed;
    return { name: project.title, completed, pending };
  });

  const handleFilterClick = (e) => setAnchorEl(e.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const handleProjectChange = (e) => setSelectedProject(e.target.value);
  const handleMemberChange = (e) => setSelectedMember(e.target.value);
  const clearFilters = () => {
    setSelectedProject('');
    setSelectedMember('');
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom><b>Project Tasks Tracker</b></Typography>
      <Typography variant="h6" gutterBottom>Welcome, Admin</Typography>

      {/* Progress Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ bgcolor: '#e3f2fd' }}>
                <CardContent>
                  <Typography>Total Tasks</Typography>
                  <Typography variant="h5" fontWeight="bold">{totalTasks}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ bgcolor: '#e8f5e9' }}>
                <CardContent>
                  <Typography>Completed Tasks</Typography>
                  <Typography variant="h5" fontWeight="bold">{completedTasks}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ bgcolor: '#ffebee' }}>
                <CardContent>
                  <Typography>Pending Tasks</Typography>
                  <Typography variant="h5" fontWeight="bold">{pendingTasks}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Filtered Tasks Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Filtered Tasks</Typography>
            <IconButton
              onClick={handleFilterClick}
              sx={{
                backgroundColor: '#e0f7fa',
                borderRadius: 2,
                p: 1,
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: '#b2ebf2',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Project</b></TableCell>
                  <TableCell><b>Assigned To</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Comment</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map(task => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{getProjectTitle(task.project?._id || task.project)}</TableCell>
                    <TableCell>{getMemberName(task.assignedTo)}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Filter Popover */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        <Box px={2} py={1} width={220}>
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
            <InputLabel>Project</InputLabel>
            <Select value={selectedProject} onChange={handleProjectChange} label="Project">
              <MenuItem value="">All Projects</MenuItem>
              {projects.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.title}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Team Member</InputLabel>
            <Select value={selectedMember} onChange={handleMemberChange} label="Team Member">
              <MenuItem value="">All Members</MenuItem>
              {members
                .filter(m => m.role?.toLowerCase() !== 'admin')
                .map(m => (
                  <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={clearFilters} fullWidth size="small" sx={{ mt: 1 }}>
            Clear Filters
          </Button>
        </Box>
      </Menu>

      {/* Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Project-wise Task Summary</Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4caf50" name="Completed" />
                <Bar dataKey="pending" fill="#f44336" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashBoard;
