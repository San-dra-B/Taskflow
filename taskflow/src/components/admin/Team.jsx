import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Stack, Button
} from '@mui/material';
import TeamAdd from './TeamAdd';
import axios from 'axios';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [adding, setAdding] = useState(false);

  const fetchTeam = async () => {
    try {
      const res = await axios.get('http://localhost:4000/teams');
      setTeam(res.data);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSave = async (member) => {
    try {
      if (editMember) {
        await axios.put(`http://localhost:4000/teams/${member._id}`, member);
      } else {
        await axios.post('http://localhost:4000/teams', member);
      }
      fetchTeam();
      setEditMember(null);
      setAdding(false);
    } catch (err) {
      console.error('Error saving member:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this team member?')) {
      try {
        await axios.delete(`http://localhost:4000/teams/${id}`);
        fetchTeam();
      } catch (err) {
        console.error('Error deleting member:', err);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Team Management</Typography>
      {!editMember && !adding && (
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => setAdding(true)}>
          + Add Team Member
        </Button>
      )}

      {(adding || editMember) && (
        <TeamAdd
          initialData={editMember}
          onSave={handleSave}
          onCancel={() => {
            setEditMember(null);
            setAdding(false);
          }}
        />
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team
              .filter(member => member.role?.toLowerCase() !== 'admin')
              .map((member) => (
                <TableRow key={member._id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                      <Button variant="outlined" color="secondary" onClick={() => setEditMember(member)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(member._id)}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Team;
