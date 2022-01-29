const inandup = require("./login.database")
const path= require("path")
const bcrypt = require("bcrypt");






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
     user.save().then((doc) => res.status(201).send(doc));
}
   //yha pe database me save

//    const files = req.files;

//     if(!files){
//         const error = new Error('Please choose files');
//         error.httpStatusCode = 400;
//         return next(error)
//     }
//     // convert images into base64 encoding
//     let imgArray = files.map((file) => {
//         let img = fs.readFileSync(file.path)

//         return encode_image = img.toString('base64')
//     })
//     let result = imgArray.map((src, index) => {

//         // create object to store data in the collection
//         let finalImg = {
//             filename : files[index].originalname,
//             contentType : files[index].mimetype,
//             imageBase64 : src
//         }
//         let newUpload = new inandup(finalImg);

//         return newUpload
//                 .save()
//                 .then(() => {
//                     return { msg : `${files[index].originalname} Uploaded Successfully...!`}
//                 })
//                 .catch(error =>{
//                     if(error){
//                         if(error.name === 'MongoError' && error.code === 11000){
//                             return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
//                         }
//                         return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
//                     }
//                 })
//                 res.send(newUpload)
//     });
// }