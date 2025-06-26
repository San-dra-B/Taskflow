import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Stack
} from '@mui/material';

const statusOptions = ['To Do', 'In Progress', 'Done'];

const TaskForm = ({ task, members, projects, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '',
    assignedTo: '', project: '', status: 'To Do'
  });

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.title && form.assignedTo && form.project && form.dueDate) {
      onSubmit(form);
    }
  };

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth />
          <TextField name="dueDate" label="Due Date" type="date" value={form.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField name="assignedTo" label="Assign To" select value={form.assignedTo} onChange={handleChange} fullWidth>
            {members.map(m => <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>)}
          </TextField>
          <TextField name="project" label="Project" select value={form.project} onChange={handleChange} fullWidth>
            {projects.map(p => <MenuItem key={p._id} value={p._id}>{p.title}</MenuItem>)}
          </TextField>
          <TextField name="status" label="Status" select value={form.status} onChange={handleChange} fullWidth>
            {statusOptions.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{task ? 'Update' : 'Add'}</Button>
      </DialogActions>
      
    </Dialog>
  );
};

export default TaskForm;