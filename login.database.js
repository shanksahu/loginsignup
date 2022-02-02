const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
   
})


const login = new mongoose.model("login", empSchema)

module.exports = login