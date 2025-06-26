const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sandrab10a701:Sj23RC9Qu1yOYlnE@cluster1.4eocoji.mongodb.net/taskflow_db?retryWrites=true&w=majority&appName=Cluster1')
.then( (res)=>{
    console.log("DB connected successfully")
})
.catch((res)=>{
    console.log("DB not connected")
});