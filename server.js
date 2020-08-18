const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const routes = require("./routes");
var bodyParser = require('body-parser');
var multer = require ("multer");

// const routes = require("./routes")
// const cors = require("./client/src/cors")
//Here you go Sarah, delete this comment later.


const app = express();

//////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////
async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "./apiAuthorization.json"
    });
    
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection("./client/src/images/abstract-background-4756987_1920.jpg");
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }

  quickstart();
  //////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////

// middleware to parse data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, "../DesignersFriends_Database/")))
const storage = multer.diskStorage({
    destination: function (req, file, cb){
   cb(null, "uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
    })   
    const upload = multer ({storage: storage})
    
    app.get("/search", (req, res)=>{
        res.sendFile(__dirname + "../client/src/pages/Search/index.js")
    })
    
    
    app.post('/uploadFile', upload.single('myImage'), (req, res, next) => {
        const file = req.file;
        if(!file){
            const error = new Error ("please upload");
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send (file);
    })

// serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")))
};

// connect to Mongo DB 
// mongoose.Promise = global.Promise
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    .then(() => console.log(`Mongo DB Succesfully Connected`))
    .catch(err => console.log(err));
// mongoose.set("useFindAndModify", false)

// use routes
app.use(routes);

// cors(app)

// check for "production" enviroment and set port
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})