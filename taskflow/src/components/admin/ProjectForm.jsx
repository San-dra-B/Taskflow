import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';

const ProjectForm = ({ initialData, onClose, onSave }) => {
  const [form, setForm] = useState({ title: '', description: '', start: '', end: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.start || !form.end) return alert('Please fill all fields');
    onSave(form);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Project' : 'Add Project'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
          <TextField label="Start Date" name="start" type="date" value={form.start} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="End Date" name="end" type="date" value={form.end} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{initialData ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;