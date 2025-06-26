const mongoose=require('mongoose');
const taskschema=mongoose.Schema({
    

    _id:mongoose.Schema.Types.ObjectId,
    title:"string",
    project:"string",
    description:"string",
    status:"string",
    comment:"string",
    assignedTo:"string",
    createdBy:"string"
    

})
const taskdata=mongoose.model('Task',taskschema); 
module.exports=taskdata;
