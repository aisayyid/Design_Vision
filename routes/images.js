// 'use strict';



// module.exports = function(app) {
    // const express = require('express')
    // const fs = require ('fs')
    // const path =require('path')
    // const multer = require('multer')
    // const app = express();


    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb){
    //    cb(null, "uploads")
    //     },
    //     filename: function(req, file, cb){
    //         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    //     }
    //     })   
    // })

    // const upload = multer ({storage: storage})
    
//     const controller = require ('/controllers/images')

//     app.route ('/log-entries/:log_entry_id/images')
//     .get(controller.index)
//     .post(upload.single("data").controller.create)
//     app.route('/log-entries/:log_entry_id/images/:id')
//         .get(controller.show)
//         .put(controller.update)
//         .delete(controller.destroy)
// }


// app.get("/search", (req, res)=>{
//     res.sendFile(__dirname + "../client/src/pages/Search/index.js")
// })

// app.post('/uploadFile', upload.single('myImage'), (req, res, next) => {
//     const file = req.file;
//     if(!file){
//         const error = new Error ("please upload");
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send (file);
// })
