const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose');
const app= express();
const cors=require('cors');
const { spawn } = require("child_process");

app.use(bodyparser.urlencoded({limit:'50mb',extended:true}))
app.use(bodyparser.json({ limit: '50mb' }));
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

app.get("/getimages",async function(req,res){
    // try{
    //     await images.find({}).then(data =>{
    //         res.send({status:"ok",data:data})
    //     })
    // }
    // catch(error){
    //       res.send(error)
    // }
  
    try {
        const latestImage = await images.findOne({}).sort({ _id: -1 });
        res.send({ status: "ok", data: latestImage });
      } catch (error) {
        res.status(500).send(error);
      }
})

app.post("/upload",function(req,res){
    console.log(req.body)
    const newImage= new images({
        myfile:req.body.myfile
    })

    newImage.save();
    const pythonScript = spawn("python", ["tree_count.py"]);

    // Listen for data from the script's stdout
    pythonScript.stdout.on("data", (data) => {
      console.log(`Python script executed ${data}`);
    });
  
    pythonScript.stderr.on("data", (data) => {
      console.error(`from Python script ${data}`);
    });
})

app.listen(5000,function(error){
    console.log("Server working on port 5000")
})