var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Comment = mongoose.model('comments');
var Stream = mongoose.model('streams');
var Hike = mongoose.model('hikes');

//post save stream to hike
router.post('/stream', function(req, res, next) {

  var newStream = new Stream({
    users: req.body.users,
    room: req.body.room
  });

  newStream.save(function(err, stream){
    if(err){
      res.json(err);
    }
    else{
      var update = {$push:{comments: newStream}};
      var options = {new: true};
      Hike.findByIdAndUpdate(req.body.id, update, options, function(err, user){
          res.json(newStream);
      });
    }
  });
});

//post save comment to stream
router.post('/stream/comment', function(req, res, next) {

  var newComment = new Comment({
    user: req.body.user,
    message: req.body.message,
    location: req.body.location
  });

  newComment.save(function(err, message){
     if(err){
      res.json(err);
    }
    var update = {$push:{comments: newComment}};
    var options = {new: true};
    Stream.findByIdAndUpdate(req.body.streamID, update, options, function(err, data){
      if (err){
        res.json(err);
      }
      else{
        res.json(data);
      }
    });
  });
});

//get single stream
router.get('/stream/:id', function(req, res, next) {

  Stream.findById(req.params.id)
    .deepPopulate('comments')
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
