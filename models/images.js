var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({

    labels: {
        type: Array,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Images = mongoose.model("image", ImageSchema);

