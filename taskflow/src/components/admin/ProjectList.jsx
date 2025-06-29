import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = () => {
    axios.get('http://localhost:4000/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = () => {
    setSelectedProject(null);
    setOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      axios.delete(`http://localhost:4000/projects/${id}`)
        .then(() => fetchProjects())
        .catch(err => console.error('Error deleting project:', err));
    }
  };

  const handleClose = () => {
    setOpen(false);
    fetchProjects();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">All Projects</Typography>
        <Button variant="contained" onClick={handleAdd}>
          + Add Project
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
              <TableCell><b>End Date</b></TableCell>
              <TableCell align="center"><b></b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.start || 'N/A'}</TableCell>
                <TableCell>{project.end || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <IconButton color="primary" onClick={() => handleEdit(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(project._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProjectForm open={open} handleClose={handleClose} project={selectedProject} />
    </Box>
  );
};

export default ProjectList;
