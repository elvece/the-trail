var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

var Hike = new Schema(
  {
    admin_id: Number,
    name: String,
    location: String,
    area: Number,
    distance_miles: Number ,
    duration_hours: Number,
    difficulity: Number,
    feature: [String],
    file: {name: String, bin: Buffer},
    map: [Number],
    info: String,
    comments: [{type: Schema.Types.ObjectId,
    ref:'streams'}],
    likes: Number
  }
);

Hike.plugin(deepPopulate);
module.exports = mongoose.model('hikes', Hike);

