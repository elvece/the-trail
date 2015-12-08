var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments');
var Stream = mongoose.model('streams');
var Hike = mongoose.model('hikes');
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//twilio
var config = require('../../../config');
var client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

///// *** TWILIO ROUTES *** /////

//route on button click to start session, will send initial text to user asking if they want to join the trail, that is, share location and pick user name
router.post('/start/session', function(req, res, next){
  client.messages.create({
    to: req.body.phone,
    from: '+17203303695',
    body: req.body.message
  }, function(err, message){
    if(err){
      res.json(err);
    }
    else {
      res.json(message);
    }
  });
});


//get location from user message


//user sends comment to hike stream
router.post('/user/comment', function(req, res, next){
  console.log('im in here');
  console.log(req.body);

  var newComment= new Comment({
    user: {
      username: req.body.username,
      phone: req.body.phone
    },
    message: req.body.Body});//??
    console.log('newComment: '+newComment);

  Hike.findById(req.body.hikeId, function(err, data){
    if (err){
      res.json(err);
    } else {
      var streamId = data.stream[0];
      newComment.save(function(err, message){
         if(err){
          res.json(err);
        } else {
            var update = {$push:{comments: newComment}};
            var options = {new: true};

            Stream.findByIdAndUpdate(streamId, update, options, function(err, data){
              if (err){
                res.json(err);
              }
              else {
                // client.messages.create({
                //   to: user.phone,
                //   from: '+17203303695',
                //   body: 'Your comment has been saved to the live stream of this hike!'
                // });
                res.json(data);
                // socket.emit('new comment from twilio!');
              }
            });
        }
      });
    }
  });

});


//route to target users from web stream to ask specific questions?







// ------------ forget about this for now ------------//

///// *** STREAM ROUTES *** /////

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
      Hike.findByIdAndUpdate(req.body.id, update, options, function(err, data){
        res.json(newStream);
      });
    }
  });
});

//post save comment to stream
router.post('/stream/comment', function(req, res, next) {
  var newComment = new Comment({
    user: {
      username: req.body.username,
      phone: req.body.phone
    },
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
