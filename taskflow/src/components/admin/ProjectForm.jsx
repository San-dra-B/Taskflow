import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import axios from 'axios';

const ProjectForm = ({ open, handleClose, project }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const [form, setForm] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    createdBy: loggedInUser?.name || 'Admin',
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        start: project.start || '',
        end: project.end || '',
        createdBy: project.createdBy || loggedInUser?.name || 'Admin',
        _id: project._id
      });
    } else {
      setForm({
        title: '',
        description: '',
        start: '',
        end: '',
        createdBy: loggedInUser?.name || 'Admin',
      });
    }
  }, [project]);

  const fetchValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitData = () => {
  const { title, description, start, end } = form;

  if (!title || !description || !start || !end) {
    return alert('Please fill all fields');
  }

  form.createdBy = loggedInUser?.name || 'Admin';

  if (form._id) {
    axios.put(`http://localhost:4000/projects/${form._id}`, form)
      .then(() => {
        alert('Project updated successfully');
        handleClose();  
      })
      .catch((error) => {
        console.error('Error updating project:', error);
        alert('Failed to update project');
      });
  } else {
    axios.post('http://localhost:4000/projects', form)
      .then(() => {
        alert('Project created successfully');
        handleClose();  
      })
      .catch((error) => {
        console.error('Error creating project:', error);
        alert('Failed to create project');
      });
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{form._id ? 'Edit Project' : 'Add Project'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
          <TextField name="title" label="Title" value={form.title} onChange={fetchValue} fullWidth />
          <TextField name="description" label="Description" value={form.description} onChange={fetchValue} fullWidth />
          <TextField name="start" type="date" label="Start Date" value={form.start} onChange={fetchValue} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField name="end" type="date" label="End Date" value={form.end} onChange={fetchValue} InputLabelProps={{ shrink: true }} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={submitData}>
          {form._id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
