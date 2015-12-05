var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hike = mongoose.model('hikes');

//get all hikes
router.get('/all', function(req, res, next){
  Hike.find(function(err, hikes){
    if(err){
      res.json(err);
    }
    else{
      res.json(hikes);
    }
  });
});

router.get('/hike/:id', function(req, res, next) {
  Hike.findById(req.params.id, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

module.exports = router;
