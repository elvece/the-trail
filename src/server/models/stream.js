var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

//individual users
var User = new User({
  phone: String,
  hikeId: String
});

User.plugin(deepPopulate);
module.exports = mongoose.model('users', User);

//individual comments
var Comment = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'users'},
  message: String,
  location: [Number],
  likes: Number
});

//registers plugin
Comment.plugin(deepPopulate);
module.exports = mongoose.model('comments', Comment);

//entire stream
var Stream = new Schema({
  room: String,
  users: Array,
  comments: [{type: Schema.Types.ObjectId, ref:'comments'}]
});

Stream.plugin(deepPopulate);
module.exports = mongoose.model('streams', Stream);
