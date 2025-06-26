import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Stack
} from '@mui/material';
import TaskForm from './TaskForm';
import { useOutletContext } from 'react-router-dom';

const dummyMembers = [
  { _id: '1', name: 'Athira' },
  { _id: '2', name: 'Ravi' },
];

const dummyProjects = [
  { _id: 'a', title: 'Website Revamp' },
  { _id: 'b', title: 'Marketing Campaign' },
];

const TaskList = () => {
  const { tasks, setTasks } = useOutletContext(); 
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (task) => {
    if (selectedTask) {
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...task, id: selectedTask.id } : t));
    } else {
      setTasks(prev => [...prev, { ...task, id: Date.now(), comment: '' }]);
    }
    setSelectedTask(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        All Tasks
      </Typography>

      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          + Add Task
        </Button>
      )}

      {showForm && (
        <TaskForm
          task={selectedTask}
          members={dummyMembers}
          projects={dummyProjects}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedTask(null);
          }}
        />
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Assigned To</b></TableCell>
              <TableCell><b>Project</b></TableCell>
              <TableCell><b>Due</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{dummyMembers.find(m => m._id === task.assignedTo)?.name}</TableCell>
                <TableCell>{dummyProjects.find(p => p._id === task.project)?.title}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => {
                      setSelectedTask(task);
                      setShowForm(true);
                    }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(task.id)}>
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

export default TaskList;