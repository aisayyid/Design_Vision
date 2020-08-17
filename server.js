const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const routes = require("./routes");

const app = express();
//////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////
async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }
  //////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////

// middleware to parse data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")))
};

// connect to Mongo DB 
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    .then(() => console.log(`Mongo DB Succesfully Connected`))
    .catch(err => console.log(err));

// use routes
app.use(routes);

// check for "production" enviroment and set port
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})