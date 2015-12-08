var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

//individual users
var User = new Schema({
  username: String,
  phone: String,
  hikeId: String
});

//individual comments
var Comment = new Schema({
  user: [{type: Schema.Types.ObjectId, ref:'users'}],
  message: String,
  location: [Number],
  likes: Number
});

//entire stream
var Stream = new Schema({
  room: String,
  users: Array,
  comments: [{type: Schema.Types.ObjectId, ref:'comments'}]
});

//registers plugin
User.plugin(deepPopulate);
Comment.plugin(deepPopulate);
Stream.plugin(deepPopulate);

//refactor later, not doing object because routes already set up for this use case
module.exports = mongoose.model('users', User);
module.exports = mongoose.model('comments', Comment);
module.exports = mongoose.model('streams', Stream);
