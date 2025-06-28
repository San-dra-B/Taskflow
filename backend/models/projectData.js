const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  start: String,
  end: String,
  createdBy: String
});

const projectdata = mongoose.model('project', projectSchema);
module.exports = projectdata;
