import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ProjectForm from './ProjectForm';

const dummyProjects = [
  { id: 1, title: 'Website Revamp', description: 'Update landing page', start: '2024-06-01', end: '2024-08-01' },
  { id: 2, title: 'Mobile App Launch', description: 'Create MVP', start: '2024-07-10', end: '2024-10-01' },
];

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    setProjects(dummyProjects);
  }, []);

  const handleAdd = () => {
    setEditProject(null);
    setOpenForm(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Delete this project?');
    if (confirm) setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSave = (project) => {
    if (editProject) {
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      setProjects(prev => [...prev, { ...project, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>All Projects</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>+ Add Project</Button>

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
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell align="center">{project.start}</TableCell>
                <TableCell align="center">{project.end}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="secondary" onClick={()=>handleEdit(project)}>Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick={()=>handleDelete(project.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <ProjectForm
          initialData={editProject}
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default ProjectList;