var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hike = mongoose.model('hikes');
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//get all hikes
router.get('/all', function(req, res, next){

  Hike.find()
    .deepPopulate('stream stream.comments')
    .exec(function(err, data){
      if(err){
        res.json(err);
      }
      else{
        res.json(data);
      }
    });
});

router.get('/hike/:id', function(req, res, next) {

  Hike.findById(req.params.id)
    .deepPopulate('stream stream.comments')
    .exec(function(err, data){
      if(err){
        res.json(err);
      }
      else{
        res.json(data);
      }
    });
});

module.exports = router;
