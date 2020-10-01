const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const likedSchema = new Schema({
  saved: String,
  username: String

})

const Liked = mongoose.model('Liked', likedSchema);

module.exports = Liked