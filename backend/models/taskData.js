const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
  description: String,
  dueDate: String, 
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  comment: String,
  assignedTo: String,
  createdBy: String
});

const taskModel = mongoose.model('tasks', taskSchema);
module.exports = taskModel;
