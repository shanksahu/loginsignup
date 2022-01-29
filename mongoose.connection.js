const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
// process.env.DATABASE  //put thisinto dabase link
mongoose.connect(process.env.DATABASELOCAL,{
    // useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
        console.log("Database is connected");
}).catch((e)=>{
    console.log(e);
})