var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:String
});
  

  
module.exports = mongoose.model('Image', imageSchema);