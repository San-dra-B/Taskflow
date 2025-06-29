const mongoose=require('mongoose');
const userschema=mongoose.Schema({
    name:"string",
    email:"string",
    role:"string"
})
const userdata=mongoose.model('User',userschema); 
module.exports=userdata;
