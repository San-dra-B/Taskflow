import React, { useState, useEffect } from 'react';
import {
  Box, Stack, TextField, Button, Typography,
  Dialog
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const [form, setForm] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    createdBy: loggedInUser?.name || 'Admin',  // fallback if no user found
  });
  
  useEffect(() => {
    if (location.state?.project) {
      setForm({
        title: location.state.project.title,
        description: location.state.project.description,
        start: location.state.project.start,
        end: location.state.project.end,
        createdBy: location.state.project.createdBy,
        _id: location.state.project._id
      });
    }
  }, [location.state]);


  const fetchValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const submitData = () => {
    const { title, description, start, end } = form;

    if (!title || !description || !start || !end) {
      return alert('Please fill all fields');
    }

    if (form._id) {
      // Update
      axios.put(`http://localhost:4000/projects/${form._id}`, form)
        .then(() => {
          alert('Project updated successfully');
          navigate('/dashadmin/projects');
        })
        .catch((error) => {
          console.error('Error updating project:', error);
          alert('Failed to update project');
        });
    } else {
      // Add
      axios.post('http://localhost:4000/projects', form)
        .then(() => {
          alert('Project created successfully');
          navigate('/dashadmin/projects');
        })
        .catch((error) => {
          console.error('Error creating project:', error);
          alert('Failed to create project');
        });
    }
  };

  return (
    
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {form._id ? 'Edit Project' : 'Add Project'}
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField name="title" label="Title" value={form.title} onChange={fetchValue} fullWidth />
        <TextField name="description" label="Description" value={form.description} onChange={fetchValue} fullWidth />
        <TextField name="start" type="date" label="Start Date" value={form.start} onChange={fetchValue} InputLabelProps={{ shrink: true }} fullWidth />
        <TextField name="end" type="date" label="End Date" value={form.end} onChange={fetchValue} InputLabelProps={{ shrink: true }} fullWidth />
        <Button variant="contained" onClick={submitData}>
          {form._id ? 'Update Project' : 'Create Project'}
        </Button>
      </Stack>
    </Box>

  );
};

export default ProjectForm;
