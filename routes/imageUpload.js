const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
const router = express.Router();
require("dotenv").config();


//////////GOOGLE VISIONS CODE///////////////////////////////////////////////////////////////////////////
async function quickstart(uploadedFile) {
    const uploadFilename = uploadedFile.filename;
    // Imports the Google Cloud client library
    const vision = require("@google-cloud/vision");

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "../apiAuthorization.json",
    });

    // Performs label detection on the image file

    const [result] = await client.labelDetection(
        "../client/public/uploads/" + uploadFilename
    );
    const labels = result.labelAnnotations;
    const labelArray = [];
    labels.forEach((label) => labelArray.push(label.description));
    //goes to google returns array
    return labelArray.sort();
}
//////////GOOGLE VISIONS CODE////////////////////////////////////////////////////////////////////////////
//Setting up aws
const s3 = new aws.S3({
    accessKeyId: 'AKIAZWVSWLTGVPEEL7NX',
    secretAccessKey: '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',
    Bucket: 'saarahahnewbucket'
});

const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'saarahahnewbucket',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');


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

//posting JSON data to a route upload file
router.post("/uploadFile", async (req, res) => {
    const file = req.file;
    //if there is not a file there is an error
    imgUpload(req, res, (error) => {
        // console.log( 'requestOkokok', req.file );
        // console.log( 'error', error );
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                console.log("This is the url", imageLocation)
                // Save the file name into database into profile model
                res.json({
                    image: imageName,
                    location: imageLocation
                  
                });
               
            }
        }
    });

    var uploadedFile = file;
    //await because quickstart takes time waits for return
    //create variable lables final
    const labelsFinal = await quickstart(uploadedFile);
    //compare imagelabelobj to other images


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











});







module.exports = router;