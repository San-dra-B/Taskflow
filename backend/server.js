const express=require('express');
const app=new express();
const cors=require('cors');
const PORT=4000;
require('./connection'); 
const userModel=require('./models/userData');
const taskModel=require('./models/taskData');
const projectModel=require('./models/projectData');
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



// server in listening mode
app.listen(PORT,()=>{ 
    console.log(`The Server is listening at ${PORT}`);
});
