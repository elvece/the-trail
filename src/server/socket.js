module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection activated!');

    // socket.emit('hi', { hello: 'world' });
    var users = [];
    //current users in room
    // socket.on('entered', function(user){
    //   if(users.indexOf(user.username) === -1){
    //     users.push(user.username);
    //   }
    //   socket.user = user.username;
    //   io.to(socket.room).emit('current-users', users);
    // });

    // //message to stream
    socket.on('comment-sent', function(message){
      io.to(socket.room).emit('comment-received', {
        message: message,
        user: socket.user,
        location: location
      });
    });

  });
};
