import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack
} from '@mui/material';

const TeamAdd = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) return alert('All fields required');
    onSave(form);
    setForm({ name: '', email: '', role: '' });
  };

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth />
          <TextField name="role" label="Role" select value={form.role} onChange={handleChange} fullWidth>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="team-member">Team Member</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamAdd;