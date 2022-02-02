const express = require("express")
const router = express.Router()
const controller = require("./controller")






router.get('/', controller.getlogin)

router.post('/login', controller.postlogin)

router.get("/send", controller.getsend)

router.get('/singup', controller.getsingup)

router.post('/singup', controller.postsingup)




module.exports =router