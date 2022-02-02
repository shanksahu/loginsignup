const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const router = require("./router")

const port = process.env.PORT || 5000

mongoose 
 .connect("mongodb+srv://shank11:shank11@cluster0.whm2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
          })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://shank11:shank11@cluster0.whm2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("Database connected!")
//   client.close();
// });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "*")
    }
    next()
})

app.use('/', router)

app.listen(port, ()=>{
    console.log(`server is live at port: localhost:${port}`);
})    



//npm install bcryptjs body-parser express mongoose nodemon