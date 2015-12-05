var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hike = mongoose.model('hike');

//get all hikes
router.get('/all', function(req, res, next){
  Hike.find(function(err, hikes){
    if(err){
      console.log(err);
      res.json(err);
    }
    else{
      console.log(hikes);
      res.json(hikes);
    }
  });
});

module.exports = router;
