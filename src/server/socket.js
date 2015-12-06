module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connection activated!');

    socket.emit('hi', { hello: 'world' });

  });
};
