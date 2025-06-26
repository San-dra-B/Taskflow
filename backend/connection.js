const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sandrab10a701:3H8qkZ!Dg3jatQx@cluster1.4eocoji.mongodb.net/taskflow_db?retryWrites=true&w=majority&appName=Cluster1')
.then( (res)=>{
    console.log("DB connected successfully")
})
.catch((res)=>{
    console.log("DB not connected")
});