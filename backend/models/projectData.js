const mongoose=require('mongoose');
const projectschema=mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
title:"string",
description:"string",
createdBy:"string"
})
const projectdata=mongoose.model('project',projectschema); 
module.exports=projectdata;
