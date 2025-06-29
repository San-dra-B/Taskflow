const express=require('express');
const app=new express();
const cors=require('cors');
const PORT=4000;
require('./connection'); 
const userModel=require('./models/userData');
const projectModel=require('./models/projectData');
const taskModel = require('./models/taskData');

app.use(cors());
app.use(express.json()); 

// ✅ API to fetch all team members from DB
app.get('/teams', async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching team members");
  }
});

app.post('/teams', async (req, res) => {
  try {
    const newMember = new userModel(req.body); 
    await newMember.save();
    res.send("Team member added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding team member");
  }
});

app.put('/teams/:id', async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body); 
    res.send("Team member updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating team member");
  }
});

app.delete('/teams/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id); 
    res.send("Team member deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting team member");
  }
});

app.get('/users', async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching users");
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskModel.find().populate('project');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const item = new taskModel(req.body);
    await item.save();
    res.send("Task added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Task updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task");
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

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

    const result = await taskModel.findByIdAndUpdate(id, { status });

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

    const result = await taskModel.findByIdAndUpdate(id, { comment });
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
