var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

//individual comments
var Comment = new Schema({
  user: {
    phone: String,
    username: String
  },
  message: String,
  location: [Number],
  likes: Number
});

Comment.plugin(deepPopulate);
module.exports = mongoose.model('comments', Comment);

//entire stream
var Stream = new Schema({
  room: String,
  users: Array,
  comments: [{type: Schema.Types.ObjectId,
    ref:'Comment'}]
});

Stream.plugin(deepPopulate);
module.exports = mongoose.model('streams', Stream);
