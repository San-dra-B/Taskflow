const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  project: String,
  description: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },
  comment: String,
  assignedTo: String,
  createdBy: String
});

const TaskModel = mongoose.model('Task', taskSchema);
module.exports = TaskModel;
