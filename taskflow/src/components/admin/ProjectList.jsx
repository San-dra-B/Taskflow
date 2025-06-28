import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';
import ProjectForm from './ProjectForm'; // Make sure the path is correct

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = () => {
    axios.get('http://localhost:4000/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Error fetching projects:', err));
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
    axios.delete(`http://localhost:4000/projects/${id}`)
      .then(() => fetchProjects())
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleClose = () => {
    setOpen(false);
    fetchProjects(); // Refresh after form closes
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>All Projects</Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        + Add Project
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell align="center"><b>Start Date</b></TableCell>
              <TableCell align="center"><b>End Date</b></TableCell>
              <TableCell align="center"><b>Edit</b></TableCell>
              <TableCell align="center"><b>Delete</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell align="center">{project.start}</TableCell>
                <TableCell align="center">{project.end}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleEdit(project)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick={() => handleDelete(project._id)}>
                    Delete
                  </Button>
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
