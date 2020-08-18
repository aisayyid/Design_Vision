var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
  
var ImageSchema = new Schema({ 

// imageName: {
//     type: String,
//     default: "none",
//     required: true
// },
// imageData: {
//     type: JSON,
//     required: true
// },
imageName: {
    type: String,
    required: true
},

labels: {
    type: Array,
    required: true
}

}); 

module.exports = Images = mongoose.model("image", ImageSchema);

// module.exports = new mongoose.model('image', ImageSchema);