var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//entire stream
var Stream = new Schema({
  room: String,
  users: Array,
  messages: [{type: Schema.Types.ObjectId,
    ref:'chatMessages'}]
});

//individual comments
var Comment = new Schema({
  user: String,
  message: String
});


module.exports = mongoose.model('comment', Comment);
module.exports = mongoose.model('stream', Stream);
