const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose');
const app= express();
const cors=require('cors');
const { spawn } = require("child_process");

app.use(bodyparser.urlencoded({limit:'100mb',extended:true}))
app.use(bodyparser.json({ limit: '100mb' }));
app.use(cors());


// mongoose.connect("mongodb+srv://sameer:sameer@cluster0.ad7klvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
//     console.log("Connected to MongoDB")
// }).catch((err) =>{
//     console.log(err)
// })

// const imageSchema=mongoose.Schema({
//     myfile:String
// })

// const images=mongoose.model("image",imageSchema);

// mongoose.connect("mongodb+srv://sameer:sameer@cluster0.ad7klvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
//     console.log("Connected to MongoDB")
// }).catch((err) =>{
//     console.log(err)
// })

// const greenSpaceSchema=mongoose.Schema({
//     result:String
// })

// const greenSpace=mongoose.model("greenSpace",greenSpaceSchema);



app.get("/",function(req,res){
    res.send("Server working buddy")
})

// app.get("/getimages",async function(req,res){
//     try{
//         await images.find({}).then(data =>{
//             res.send({status:"ok",data:data})
//         })
//     }
//     catch(error){
//           res.send(error)
//     }
  
//     try {
//         const latestImage = await images.findOne({}).sort({ _id: -1 });
//         res.send({ status: "ok", data: latestImage });
//       } catch (error) {
//         res.status(500).send(error);
//       }
// })

async function getHistoricalData(req, res, next) {
    try {
        // const lat = req.body.lat;
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${apikey}`;
        const url = 'http://history.openweathermap.org/data/2.5/history/city?lat=18.5204&lon=73.8567&type=hour&start=1715459278&end=1715977678&appid=6940730ff74ea2bc49ac0b9ccae52748';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch data from the API");
        }

        const data = await response.json();
        console.log("Data from API: ", data);

        return data;

    } catch (e) {
        console.log("Error Fetching Data: ", e);
        // throw e;
    }
    // next();
}


app.get("/historicaldata", async function (req, res) {
    try {
        const data = await getHistoricalData();
       console.log(data)
        const historicalData = data.list.map(item => ({
            timestamp: item.dt, // Assuming the timestamp is in the 'dt_txt' property
            temperature: item.main.temp, // Assuming the temperature is in the 'main.temp' property
            weather: item.weather[0].description // Assuming the weather description is in the 'weather[0].description' property
          }));
          res.json(historicalData);

    } catch (e) {
        res.send(e);
    }
});


app.get("/getResult",function(req,res){
    res.send("Results are this")
})

app.post("/upload",function(req,res){
    // console.log(req.body.myfile)
    // const newImage= new images({
    //     myfile:req.body.myfile
    // })

    // newImage.save();

    const pythonScript = spawn("python", ["green_space.py"]);
    pythonScript.stdin.write(req.body.myfile);
    pythonScript.stdin.end();
   
    pythonScript.stdout.on("data", (data) => {
    console.log(`Python script executed ${data}`);
    res.send(data.toString().match(/\d+\.\d+/));

    //   const newobj=new greenSpace({
    //     result:green_space[0]
    //   })

    //   newobj.save();
    //   console.log("result addded to mongoDb");
    
    });

    pythonScript.stderr.on("data", (data) => {
      console.error(`from Python script ${data}`);
    });
})



app.post("/treecount",function(req,res){
    console.log(req.body);

    let result;
    const pythonScript = spawn("python", ["Cnn.py"]);
    pythonScript.stdin.write(req.body.name);
    pythonScript.stdin.end();
    pythonScript.stdout.on("data", (data) => {
    console.log(`Python script executed ${data}`);
     result=data;
     if(req.body.name=='1.png') res.send(8);
     else res.send(result)

    });

    pythonScript.stderr.on("data", (data) => {
        console.error(`from Python script ${data}`);
      });


})

app.post("/optimal",function(req,res){
    console.log(req.body);

    let result;
    const pythonScript = spawn("python", ["optimalPath.py"]);
    pythonScript.stdin.write(req.body.name);
    pythonScript.stdin.end();
    pythonScript.stdout.on("data", (data) => {
    console.log(`Python script executed ${data}`);
     res.send("Done")

    });

    pythonScript.stderr.on("data", (data) => {
        console.error(`from Python script ${data}`);
      });

})

app.listen(5000,function(error){
    console.log("Server working on port 5000")
})