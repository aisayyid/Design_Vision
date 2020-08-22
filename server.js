const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const routes = require("./routes");
var bodyParser = require("body-parser");
var multer = require("multer");
const Images = require("./models/images");
const fs = require("fs");
const User = require("./models/user");
// const Gallery = require("./models/gallery");
// const db = require("./models");

// const routes = require("./routes")
// const cors = require("./client/src/cors")
//Here you go Sarah, delete this comment later.

const app = express();

//////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////
async function quickstart(uploadedFile) {
  const uploadFilename = uploadedFile.filename;
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./apiAuthorization.json",
  });

  // Performs label detection on the image file

  const [result] = await client.labelDetection(
    "./client/public/uploads/" + uploadFilename
  );
  const labels = result.labelAnnotations;
  const labelArray = [];
  console.log("Labels:");
  labels.forEach((label) => labelArray.push(label.description));
  //goes to google returns array
  return labelArray;
}

//////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////

// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "../DesignersFriends_Database/")))
//setting up multer
const storage = multer.diskStorage({
  //telling the destination of where to save the files
  destination: function (req, file, cb) {
    cb(null, __dirname + "/client/public/uploads/");
  },
  //setting up file name
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//sets a const for multer's storage engine
const upload = multer({ storage: storage });

//we are pulling back the form data from search
app.get("/search", (req, res) => {
  //res sendfile grabs from path
  res.sendFile(__dirname + "/client/src/pages/Search/index.js");
});

//posting JSON data to a route upload file
app.post("/uploadFile", upload.single("myImage"), async (req, res, next) => {
  const file = req.file;
  console.log("heres the file", file);
  console.log("req.body", req.body);
  //if there is not a file there is an error
  if (!file) {
    const error = new Error("please upload");
    error.httpStatusCode = 400;
    return next(error);
  }
  //sets a variable for uploaded file to the posted file
  var uploadedFile = file;
  //await because quickstart takes time waits for return
  //create variable lables final
  const labelsFinal = await quickstart(uploadedFile);

  //set up new image const equal to the model
  const newImage = new Images({
    imageName: uploadedFile.filename,
    //set labels to the labels final const
    labels: labelsFinal,
  });
  //save a new image as JSON
  newImage
    .save()
    .then((image) => {
      //use the collection to find images with labels in common
      Images.find({ labels: { $in: labelsFinal } }).then((data) => {
        res.json(data);
      });
    })
    .catch((err) => console.log(err));
});

//add a get route to bring back all/one image
app.get("/file", (req, res) => {
  console.log("Server side route hit");
  //use the Images collection to do a db query to bring back all images for testing
  Images.find({})
    .then((data) => {
      console.log(data);
      //sends the data to the client in an express response.
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.post("/gallery", (req, res)=> {
    console.log("dashboard hit", req.body);
    User.findByIdAndUpdate(req.body.user, { $push: { gallery: req.body.gallery }}, {new:true})
    .then((data) => {
        console.log("dashboard data" , data);
        //sends the data to the client in an express response.
        res.json(data);
      })
      .catch((err) => console.log(err));
})

app.get("/gallerydisplay/:id", (req, res)=>{
  User.findById(req.params.id)
  .then((data) => {
//sends the data to the client in an express response.
      res.json(data);
      console.log("GOT THE FUCKIN User data", data);
    })
    .catch((err) => console.log(err));
})
app.delete("/gallerydelete/:id", (req, res)=>{
  User.findByIdAndUpdate(req.body.user, { $unset: { gallery: req.body.gallery }}, {new:true})
  .then((data) => {
//sends the data to the client in an express response.
      res.json(data);
      console.log("Delete route data", data);
    })
    .catch((err) => console.log(err));
})

// serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
} else {
  app.use(express.static(path.join(__dirname, "./client/public")));
}

// connect to Mongo DB
// mongoose.Promise = global.Promise
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log(`Mongo DB Succesfully Connected`))
  .catch((err) => console.log(err));
// mongoose.set("useFindAndModify", false)

// use routes
app.use(routes);

// check for "production" enviroment and set port
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
