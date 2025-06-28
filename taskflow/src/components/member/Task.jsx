import React, { useEffect } from 'react';
import {
  Box, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, Paper
} from '@mui/material';

import { useOutletContext } from 'react-router-dom';
import Status from './Status';
import Comment from './Comment';
import axios from 'axios';

const Task = () => {
  const { tasks, setTasks, currentUser } = useOutletContext();

  useEffect(() => {
    console.log(" Current user:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks')
      .then(res => {
        console.log("Tasks fetched", res.data);
        setTasks(res.data);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
      });
  }, [setTasks]);

  const assignedTasks = (tasks || []).filter(task =>
    task.assignedTo === currentUser?.name
  );

  useEffect(() => {
    if (assignedTasks.length > 0) {
      console.log("Assigned Tasks:", assignedTasks);
    }
  }, [assignedTasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/updatestatus/${taskId}`, {
        status: newStatus,
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleCommentChange = async (taskId, newComment) => {
    try {
      await axios.put(`http://localhost:4000/updatecomment/${taskId}`, {
        comment: newComment,
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === taskId ? { ...task, comment: newComment } : task
        )
      );
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        My Assigned Tasks
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Project</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Assigned By</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
              <TableCell align="center"><b>Comment</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {assignedTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks assigned to you.
                </TableCell>
              </TableRow>
            ) : (
              assignedTasks.map((task, index) => (
                <TableRow key={task._id || index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.createdBy}</TableCell>
                  <TableCell align="center">
                    <Status
                      currentStatus={task.status}
                      onStatusChange={status =>
                        handleStatusChange(task._id, status)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Comment
                      value={task.comment}
                      onChange={e =>
                        handleCommentChange(task._id, e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Task;
