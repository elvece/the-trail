module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection activated!');

    var users = [];

    //initalize room for hike
    socket.on('init', function(room){
      socket.room = room;
      socket.join(room);
    });

    //current users in room
    socket.on('entered', function(user){
      if(users.indexOf(user) === -1){
        users.push(user);
      }
      // console.log(users);
      socket.user = user;
      console.log(socket.room)
      console.log(socket.user)
    });

    // //message to stream
    socket.on('comment-sent', function(message){
      io.to(socket.room).emit('comment-received', {
        message: message,
        user: socket.user
        // location: location
      });
    });

    //sends location data
    socket.on('location', function (data) {
      io.sockets.emit('location', data);
    });

  });
};
