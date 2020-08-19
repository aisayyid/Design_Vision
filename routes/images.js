// const router = require("express").Router();
// const Image = require ("../models/images")

// router.get("/search", (req, res)=>{
//     res.sendFile(__dirname + "/client/src/pages/Search/index.js")
// })


// router.post('/uploadFile', upload.single('myImage'), async (req, res, next) => {
//     const file = req.file;
//     if(!file){
//         const error = new Error ("please upload");
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     // res.send (file);
//     var uploadedFile = file;
//     //await because quickstart takes time waits for return
//     const labelsFinal = await quickstart(uploadedFile);

//     //model
//     const newImage = new Images({
//         imageName: uploadedFile.filename,
//         labels: labelsFinal
//     })
//     newImage.save().then(image => res.json(image)).catch(err => console.log(err))
// })

// module.exports = router;