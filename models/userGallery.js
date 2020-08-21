const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    imageName: {
        type: String,
        required: true
    },
    
    labels: {
        type: Array,
        required: true
    }
    
    }); 

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;

