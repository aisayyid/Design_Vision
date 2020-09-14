const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const routes = require("./routes");
var bodyParser = require("body-parser");
var aws = require('aws-sdk')
var multer = require("multer");
var multerS3 = require('multer-s3')
const Images = require("./models/images");
const fs = require("fs");
const User = require("./models/user");
const app = express();


//////////GOOGLE VISIONS CODE//////////////////////////////////////////////////////////////////////////////
async function quickstart(uploadedFile) {
  const uploadFileurl = uploadedFile.location;
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./apiAuthorization.json",
  });

  // Performs label detection on the image file

  const [result] = await client.labelDetection(uploadFileurl);
  console.log("This is goolge url", uploadFileurl)
  const labels = result.labelAnnotations;
  console.log("these are the labels", labels);
  const labelArray = [];
  labels.forEach((label) => labelArray.push(label.description));
  //goes to google returns array
  return labelArray.sort();
}

//////////GOOGLE VISIONS CODE/////////////////////////////////////////////////////////////////////////////
// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET_NAME
});
//sets a const for multer's storage engine

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
})

/**
* Check File Type
* @param file
* @param cb
* @return {*}
*/
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


//we are pulling back the form data from search
app.get("/search", (req, res) => {
  //res sendfile grabs from path
  res.sendFile(__dirname + "/client/src/pages/Search/index.js");
});

//posting JSON data to a route upload file
app.post("/uploadFile", upload.single("myImage"), async (req, res, next) => {
  const file = req.file;
  console.log("this is the file", file)
  //if there is not a file there is an error
  if (!file) {
    const error = new Error("please upload");
    error.httpStatusCode = 400;
    return next(error);

  };

  //newcommentdelete
  var uploadedFile = file;
  //await because quickstart takes time waits for return
  //create variable lables final
  const labelsFinal = await quickstart(uploadedFile);


  //compare imagelabelobj to other images

  //set up new image const equal to the model
  const newImage = new Images({
    //set labels to the labels final const
    labels: labelsFinal,
    url: uploadedFile.location
  });
  console.log("New Image", newImage);
  //save a new image as JSON
  newImage
    .save()
    .then((image) => {
      //if statement confidence factors (if matches higher push to front)

      //labels final has matching criteria

      //match labels and get a number of matches
      //use array sort to give you desc order of matches
      //order data array from most to least matching criteria

      //use the collection to find images with labels in common
      Images.find({ labels: { $in: labelsFinal } })
        .lean()
        .then((data) => {
          // iterate through array objects in database (images.find)
          //compare those image objects based on how many labels match labelsfinal
          //array push to front of newArr
          let arrayToSort = [];
          //get complete list of labels for each image and compare those
          // loop over every image that comes back as a match from the db
          let arrayOfMatches = [];

          data.forEach((dbImage) => {
            //empty to start a new count
            arrayOfMatches = [];
            //array of labels for that image
            dbImage.labels.forEach((dbLabel) => {
              labelsFinal.forEach((label) => {
                if (dbLabel == label) {
                  arrayOfMatches.push(dbLabel);
                  // console.log("this is array of matches", arrayOfMatches);
                }
              });
            });
            // console.log("this is the array of matches", arrayOfMatches);
            //compute confidence
            confidence = arrayOfMatches.length;
            // console.log("this is the confidence" , confidence)
            //attach
            //  dbImage.test = "test";
            // console.log(dbImage.name, " has this confidence " , dbImage.confidence);
            //add an if confidence values = same sort by color
            dbImage.confidence = confidence;
            // console.log("THIS IS DB IMAGE" , dbImage)
            arrayToSort.push(dbImage);

          });
          //push the image to the array

          //then sort that array
          let sortedData = arrayToSort.sort((a, b) => {
            return b.confidence - a.confidence;
          });
          // then send out the sorted data..
          // ).then((data) => {
          //  console.log("array to sort" ,arrayToSort)
          res.json(sortedData);
          // console.log(sortedData)
        }); //end of the find
    })
    .catch((err) => {
      res.json({ message: "duplicate" })
      // console.log(err)
    }); //end of the db save
}); //end of the post

//add a get route to bring back all/one image
app.get("/file", (req, res) => {

  //use the Images collection to do a db query to bring back all images for testing
  Images.find({})
    .then((data) => {
      //sends the data to the client in an express response.
      var imageData = res.json(data);
      console.log("Data pass to front", imageData)
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
