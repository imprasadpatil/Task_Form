//let mongo = require('mongodb');
let MongoUrl = "mongodb://localhost:27017";
let {MongoClient} = require('mongodb');
let client = new MongoClient(MongoUrl);

async function dbConnect(){
    await client.connect();
}
let db = client.db('userdata');
// Get All Users data
async function getAllData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    }catch(err){
        output = ({"Error":"Error While Getting the Data"})
    }
    return output;
}
// Get User By Id
async function getDataById(colName, condition) {
    try {
        const user = await db.collection(colName).findOne(condition);
        return user ? [user] : []; // Return an array with the user object or an empty array if not found
    } catch (err) {
        return { "Error": "Error While Getting the Data" };
    }
}

async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data);
    }catch(err){
        output ={"response":"Error in adding new user"}
    }
    return output;
}

async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data);
    }catch(err){
        output ={"response":"Error While Updating User"}
    }
    return output;
}

async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition);
    }catch(err){
        console.log(err)
            output ={"response":"Error While Deleting User"}
    }
    return output;
}

module.exports = {
    dbConnect,
    getAllData,
    getDataById,
    postData,
    updateData,
    deleteData
    }