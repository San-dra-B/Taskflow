const express=require('express');
const app=new express();
const cors=require('cors');
const PORT=4000;
require('./connection'); 
const userModel=require('./models/userData');
const taskModel=require('./models/taskData');
const projectModel=require('./models/projectData');
const TaskModel = require('./models/taskData');



app.use(cors());
app.use(express.json()); 

// API /to fetch userdata from DB
app.get('/users',async(req,res)=>{  
try{const data=await userModel.find();
    res.send(data);
}catch(err){
    console.log(err);
}
})


// API /to fetch taskdata from DB
app.get('/tasks',async(req,res)=>{  
try{const data=await taskModel.find();
    res.send(data);
}catch(err){
    console.log(err);
}
})

// API /to fetch projectdata from DB
app.get('/projects',async(req,res)=>{  
try{const data=await projectModel.find();
    res.send(data);
}catch(err){
    console.log(err);
}
})

// API /to add a new project
app.post('/projects', async (req, res) => {  
  try {
    const item = req.body;
    const newProject = new projectModel(item);
    await newProject.save();
    res.send("Project added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding project");
  }
});

// API /to update a project by ID
app.put('/projects/:id', async (req, res) => {  
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Project updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating project");
  }
});

// API /to delete a project by ID
app.delete('/projects/:id', async (req, res) => {  
  try {
    await projectModel.findByIdAndDelete(req.params.id);
    res.send("Project deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting project");
  }
});

// API for updating status
app.put('/updatestatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await TaskModel.findByIdAndUpdate(id, { status });

    if (!result) return res.send("Task not found");

    res.send("Status updated successfully");
  } catch (err) {
    res.send("Error updating status");
  }
});

// API for comments
app.put('/updatecomment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const result = await TaskModel.findByIdAndUpdate(id, { comment });
    if (!result) return res.send("Task not found");

    res.send("Comment updated successfully");
  } catch (err) {
    res.send("Error updating comment");
  }
});


// server in listening mode
app.listen(PORT,()=>{ 
    console.log(`The Server is listening at ${PORT}`);
}); 