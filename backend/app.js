//Declearing Express Application
let express = require('express');
let app = express();
//required Packages and Variables
let port = 9800;
let cors = require('cors');
let bodyParser = require('body-parser');
let Mongo = require('mongodb')
//let {ObjectId} = require('mongodb');
let {dbConnect,getData,postData,updateData,deleteData} = require("./controller/usercontroller");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//API URLS
app.get('/',(req,res) => {
    res.send("Hiii From Express")
});

//Getting ALL
app.get('/getusers', async (req,res)=>{
    let query = {};
    let collection = "formdata";
    let output = await getData(collection);
    res.send(output)
});

//Adding New Data
app.post('/adduser',async(req,res)=>{
    let body = req.body;
    let collection = "formdata";
    let response = await postData(collection,body);
    res.send(response)
    console.log(response)
});

//Updating User
app.put('/updateuser',async(req,res)=>{
    let collection = "formdata";
    let condition = {"_id": new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "name":req.body.name,
            "age":req.body.age,
            "address":req.body.address,
            "status":req.body.status,      
        }
    }
    let output = await updateData(collection,condition,data)
    res.send(output)
});

//delete User
app.delete('/deleteuser',async(req,res)=>{
    let collection = "formdata";
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteData(collection,condition)
    res.send(output)
});
//app server setup
app.listen(port,(err)=>{
    dbConnect();
    if(err) throw err;
    console.log(`application is running at port no ${port}`)
});
    // "name":req.body.name,
    // "age":req.body.age,
    // "address":req.body.address