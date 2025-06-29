import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Menu, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Stack, FormControl, InputLabel, Select, Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TaskForm from './TaskForm';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTask, setMenuTask] = useState(null);

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

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
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

  const filteredTasks = tasks.filter(task => {
    return (
      (!selectedProject || task.project?._id === selectedProject) &&
      (!selectedMember || task.assignedTo === selectedMember)
    );
  });

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">All Tasks</Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={handleAdd}>
            + Add Task
          </Button>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Assigned To</b></TableCell>
              <TableCell><b>Project</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell align="center"><b></b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{getMemberName(task.assignedTo)}</TableCell>
                <TableCell>{task.project?.title || 'Unknown'}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <IconButton color="primary" onClick={() => handleEdit(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        setMenuAnchor(e.currentTarget);
                        setMenuTask(task);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="body2"><b>Status:</b> {menuTask?.status || 'None'}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}><b>Comment:</b> {menuTask?.comment || 'None'}</Typography>
        </Box>
      </Menu>

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
