var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

//entire stream
var Stream = new Schema({
  room: String,
  users: Array,
  comments: [{type: Schema.Types.ObjectId,
    ref:'comments'}]
});

//individual comments
var Comment = new Schema({
  user: String,
  message: String,
  location: [Number]
});

Comment.plugin(deepPopulate);
Stream.plugin(deepPopulate);

module.exports = mongoose.model('comments', Comment);
module.exports = mongoose.model('streams', Stream);
