//required Packages and Variables
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let Mongo = require('mongodb')
let port = 9800;
//Declearing Express Application
let app = express();
//let {ObjectId} = require('mongodb');
let { dbConnect, getAllData, getDataById, postData, updateData, deleteData } = require("./controller/usercontroller");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//API URLS
app.get('/', (req, res) => {
    res.send("Hiii From Express")
});

//Getting ALL
app.get('/getusers', async (req, res) => {
    let query = {};
    let collection = "formdata";
    let output = await getAllData(collection);
    console.log('All Usrs Data Is Recived...!!')
    res.send(output)
});

// Getting User by Id
app.get('/getuserbyid/:id', async (req, res) => {
    let collection = "formdata";
    let userId = req.params.id;
    console.log("Updating User with ID : ",userId);
    let condition = { "_id": new Mongo.ObjectId(userId) };
    let output = await getDataById(collection, condition);
    if (output.length > 0) {
        res.send(output[0]); // Send the first (and only) object in the array
    } else {
        res.status(404).send({ error: "User not found" });
    }
});


//Adding New Data
app.post('/adduser', async (req, res) => {
    let body = req.body;
    let collection = "formdata";
    let response = await postData(collection, body);
    res.send(response)
    console.log('The New User Is Added :',response)
});

//Updating User
app.put('/updateuser/:id', async (req, res) => {
    let collection = "formdata";
    let userId = req.params.id;
    //console.log(userId)
    let condition = { "_id": new Mongo.ObjectId(userId) }
    let data = {
        $set: {
            "name": req.body.name,
            "age": req.body.age,
            "address": req.body.address,
            "status": req.body.status,
        }
    }
    let output = await updateData(collection, condition, data)
    console.log(`The User With Id ${userId} is Updated.!`)
    res.send(output)
});

//delete User
app.delete('/deleteuser/:id', async (req, res) => {
    let collection = "formdata";
    let userId = req.params.id;  // Get the id from the URL parameter
    console.log(userId);
    let condition = { "_id": new Mongo.ObjectId(userId) };
    let output = await deleteData(collection, condition);
    console.log('The User Is',output);
    res.send(output);
});

//app server setup
app.listen(port, (err) => {
    dbConnect();
    if (err) throw err;
    console.log(`application is running at port no ${port}`)
});
// "name":req.body.name,
// "age":req.body.age,
// "address":req.body.address