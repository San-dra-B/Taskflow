import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Stack, Button
} from '@mui/material';
import Teamadd from './Teamadd';

const initialTeam = [
  { id: 1, name: 'Athira', email: 'athira@gmail.com', role: 'admin' },
  { id: 2, name: 'Ravi', email: 'ravi@gmail.com', role: 'team-member' },
  { id: 3, name: 'Priya', email: 'priya@gmail.com', role: 'team-member' },
];

const Team = () => {
  const [team, setTeam] = useState(initialTeam);
  const [editMember, setEditMember] = useState(null);
  const [adding, setAdding] = useState(false);

  const handleSave = (member) => {
    if (editMember) {
      setTeam(prev => prev.map(t => t.id === member.id ? member : t));
    } else {
      setTeam(prev => [...prev, { ...member, id: Date.now() }]);
    }
    setEditMember(null);
    setAdding(false);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Delete this team member?');
    if (confirm) setTeam(prev => prev.filter(m => m.id !== id));
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
        <Teamadd
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
            {team.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell align="right">
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={() => setEditMember(member)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(member.id)}>
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