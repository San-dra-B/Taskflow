import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Stack
} from '@mui/material';
import axios from 'axios';

const TaskForm = ({ open, onClose, task, members, projects }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const initialForm = {
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    project: '',
    createdBy: loggedInUser?.name || 'Admin'
  };

  const [form, setForm] = useState(initialForm);

useEffect(() => {
  if (task) {
    const projectId =
      typeof task.project === 'object' && task.project !== null
        ? task.project._id
        : task.project;

    setForm({
      ...task,
      project: projectId,
      createdBy: task.createdBy || loggedInUser?.name || 'Admin'
    });
  } else {
    setForm(initialForm);
  }
}, [task, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { title, description, dueDate, assignedTo, project } = form;
    if (!title || !description || !dueDate || !assignedTo || !project) {
      alert('Please fill all required fields');
      return;
    }

    if (task?._id) {
      axios.put(`http://localhost:4000/tasks/${task._id}`, form)
        .then(() => {
          alert('Task updated');
          onClose();
        })
        .catch(err => alert('Failed to update task'));
    } else {
      axios.post('http://localhost:4000/tasks', form)
        .then(() => {
          alert('Task added');
          onClose();
        })
        .catch(err => alert('Failed to add task'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth />
          <TextField name="dueDate" label="Due Date" type="date" value={form.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField name="assignedTo" label="Assign To" select value={form.assignedTo} onChange={handleChange} fullWidth>
            {members.filter(m => m.role !== 'Admin').map(m => (
              <MenuItem key={m._id} value={m.name}>{m.name}</MenuItem>
            ))}
          </TextField>
          <TextField name="project" label="Project" select value={form.project} onChange={handleChange} fullWidth>
             {projects.map(p => (
             <MenuItem key={p._id} value={p._id}>{p.title}</MenuItem>
             ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {task ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
