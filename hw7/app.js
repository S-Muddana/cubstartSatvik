var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var name;

// TODO: Set up a socket.io connection handler, which will be called whenever a new client connects.
// YOUR CODE HERE
io.on('connection', (socket) => {
  console.log("a new user has connected!");
  name = "";

  // TODO: The handler should emit a 'welcome' event to the client, with a message and a name.
  socket.on('join', (username) => {
    name = username;
    socket.broadcast.emit('message', `${username} just joined the chat!`);
  });

  // TODO: The handler should also emit a 'disconnected' event when another client disconnects.
  socket.on('disconnect', () => {
    // YOUR CODE HERE
    socket.broadcast.emit('message', `${name} has left the chat`);
  });

  // TODO: The handler should also broadcast a message whenever it receives a chat message.
  socket.on('message', (msg) => {
    // YOUR CODE HERE
    socket.broadcast.emit('message', `${msg}`);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on :3000');
});

