import React from 'react';
import { TextField } from '@mui/material';

const Comment = ({ value, onChange }) => (

  

  <TextField
    variant="outlined"
    size="small"
    fullWidth
    placeholder="Add comment"
    value={value}
    onChange={onChange}
    multiline
    maxRows={2}
  />
  
);

export default Comment;