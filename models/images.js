var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({

    imageName: {
        type: String,
        required: true,
        unique: true
    },

    labels: {
        type: Array,
        required: true
    }

});

module.exports = Images = mongoose.model("image", ImageSchema);

