const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  start: String,
  end: String,
  createdBy: String
});

const projectData = mongoose.model('project', projectSchema);
module.exports = projectData;
