const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: String,
    email: String,
    role: String
});

const userdata = mongoose.model('User', userschema);
module.exports = userdata;
