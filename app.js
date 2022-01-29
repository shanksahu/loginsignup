const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config({path: "./config.env"})
require("./mongoose.connection")
const router = require("./router")

const port = process.env.PORT




app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

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