import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack,
  IconButton, Menu, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TaskForm from './TaskForm';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const fetchAll = () => {
    axios.get('http://localhost:4000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));

    axios.get('http://localhost:4000/users')
      .then(res => setMembers(res.data))
      .catch(err => console.error('Error fetching users:', err));

    axios.get('http://localhost:4000/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = () => {
    setSelectedTask(null);
    setOpen(true);
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      axios.delete(`http://localhost:4000/tasks/${id}`)
        .then(() => fetchAll())
        .catch(err => console.error('Error deleting task:', err));
    }
  };

  const handleClose = () => {
    setOpen(false);
    fetchAll();
  };

  const getMemberName = (idOrName) => {
    const member = members.find(m => m._id === idOrName || m.name === idOrName);
    return member ? member.name : idOrName;
  };
  const getProjectTitle = (projectId) => {
    const project = projects.find(p => p._id === projectId);
    return project ? project.title : 'Unknown';
  };


  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };
  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };
  const clearFilters = () => {
    setSelectedProject('');
    setSelectedMember('');
  };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        All Tasks
      </Typography>

      <Stack direction="row" spacing={2} mb={2} alignItems="center" justifyContent="space-between">
        <Button variant="contained" onClick={handleAdd}>
          + Add Task
        </Button>

        <IconButton onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
          <Box px={2} py={1} width={220}>
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel>Project</InputLabel>
              <Select value={selectedProject} onChange={handleProjectChange} label="Project">
                <MenuItem value="">All</MenuItem>
                {projects.map(p => (
                  <MenuItem key={p._id} value={p._id}>{p.title}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Team Member</InputLabel>
              <Select value={selectedMember} onChange={handleMemberChange} label="Assigned To">
                <MenuItem value="">All</MenuItem>
                {members.filter(m => m.role !== 'Admin').map(m => (
                  <MenuItem key={m._id} value={m.name}>{m.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={clearFilters} fullWidth size="small" sx={{ mt: 1 }}>
              Clear Filters
            </Button>
          </Box>
        </Menu>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Assigned To</b></TableCell>
              <TableCell><b>Project</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => {
                return (
                  (!selectedProject || task.project?._id === selectedProject) &&
                  (!selectedMember || task.assignedTo === selectedMember)
                );
              })
              .map(task => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{getMemberName(task.assignedTo)}</TableCell>
                  <TableCell>{task.project?.title || 'Unknown'}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="outlined" onClick={() => handleEdit(task)}>Edit</Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TaskForm
        open={open}
        onClose={handleClose}
        task={selectedTask}
        members={members}
        projects={projects}
      />
    </Box>
  );
};

export default TaskList;
