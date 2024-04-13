const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose');
const app= express();
const cors=require('cors');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(cors())

mongoose.connect("mongodb+srv://sameer:sameer@cluster0.ad7klvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to MongoDB")
}).catch((err) =>{
    console.log(err)
})

const imageSchema=mongoose.Schema({
    myfile:String
})

const images=mongoose.model("image",imageSchema);

app.get("/",function(req,res){
    res.send("Server working buddy")
})

app.post("/upload",function(req,res){
    console.log(req.body)
    const newImage= new images({
        myfile:req.body.myfile
    })

    newImage.save();
})

app.listen(5000,function(error){
    console.log("Server working on port 5000")
})