const inandup = require("./login.database")
const path= require("path")
const bcrypt= require("bcrypt")

exports.getlogin = (req, res)=>{
    res.sendFile(path.join(__dirname, "./login.html"))  
}

exports.postlogin = async (req, res)=>{
    const body = req.body;
    console.log(body);
    if (!(body.email && body.password)) { //agr id pass khali rha to
        return res.status(400).send({ error: "Data not formatted properly" });
      }
    const user = await inandup.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Logged In" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  
}

exports.getsend =async (req, res)=>{
    const senddata = await inandup.find({})
    res.send(senddata)
}

exports.getsingup = (req, res)=>{
    res.sendFile(path.join(__dirname, "./singup.html"))  
}

exports.postsingup =  async (req, res, next)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    const body = req.body;
    if (!(body.email && body.password)) { //agr id pass khali rha to
      return res.status(400).send({ error: "Data not formatted properly" });
    }

     // creating a new mongoose doc from user data
     const user = new inandup(body); //database me dala lekin save mhi kiya
     // generate salt to hash password
     const salt = await bcrypt.genSalt(10);
     // now we set user password to hashed password
     user.password = await bcrypt.hash(user.password, salt);
     user.save().then((doc) => res.status(201).redirect("/"));
}
