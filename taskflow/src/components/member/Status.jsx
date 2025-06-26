import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Status = ({ currentStatus, onStatusChange }) => (
  <FormControl size="small" fullWidth>
    <InputLabel>Status</InputLabel>
    <Select
      value={currentStatus}
      label="Status"
      onChange={(e) => onStatusChange(e.target.value)}
    >
      <MenuItem value="To Do">To Do</MenuItem>
      <MenuItem value="In Progress">In Progress</MenuItem>
      <MenuItem value="Done">Done</MenuItem>
    </Select>
  </FormControl>
);

export default Status;