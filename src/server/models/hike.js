var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var hikeSchema = new Schema(
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
    ref:'stream'}]
  }
);

var Hike = mongoose.model('hike', hikeSchema);


module.exports = {
  Hike: Hike
};


