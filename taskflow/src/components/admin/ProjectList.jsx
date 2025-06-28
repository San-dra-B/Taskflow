import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
 
 useEffect(() => {
  axios.get('http://localhost:4000/projects')
    .then((res) => setProjects(res.data))
    .catch((err) => console.error('Error fetching projects:', err));
}, []);

  const navigate = useNavigate();
  let handleEdit = (project) => {
    navigate('/dashadmin/editproject', { state: { project } });
  };

const handleDelete = (id) => {
    axios.delete("http://localhost:4000/projects/" + id)
      .then((res) => {
        window.location.reload(); // reload to reflect changes
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
};

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>All Projects</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate('/dashadmin/addproject')}>
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
    </Box>
  );
};

export default ProjectList;
