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
const app = express();
const router = express.Router();


// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router being picked up by server.js.
module.exports = router;

//Requiring image upload file.
const newUpload = require ("./routes/imageUpload");
app.use("/imageUpload", newUpload)


//we are pulling back the form data from search
app.get("/search", (req, res) => {
  //res sendfile grabs from path
  res.sendFile(__dirname + "/client/src/pages/Search/index.js");
});

//add a get route to bring back all/one image
app.get("/file", (req, res) => {
  console.log("Server side route hit");
  //use the Images collection to do a db query to bring back all images for testing
  Images.find({})
    .then((data) => {
      //sends the data to the client in an express response.
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.post("/gallery", (req, res) => {
  console.log("dashboard hit", req.body);
  User.findByIdAndUpdate(
    req.body.user,
    { $push: { gallery: req.body.gallery } },
    { new: true }
  )
    .then((data) => {
      //sends the data to the client in an express response.
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.get("/gallerydisplay/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      //sends the data to the client in an express response.
      res.json(data);
      console.log("GOT THE FUCKIN User data", data);
    })
    .catch((err) => console.log(err));
});
app.delete("/gallerydelete/:id", (req, res) => {
  console.log("req.body", req.body)
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { gallery: req.body.image } },
    { new: true }
  )
    .then((data) => {
      //Sends the data to the client in an express response.
      res.json(data);
      console.log("Delete route data", data);
    })
    .catch((err) => console.log(err));
});

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
