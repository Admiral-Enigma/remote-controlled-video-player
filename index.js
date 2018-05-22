var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fisksildfisk', function (req, res) {
  res.sendFile(__dirname + '/control.html');
});

io.on('connection', function (socket) {
  //console.log(Object.keys(io.sockets.sockets).length);
  socket.on('getClients', function () {
    socket.emit('clients', Object.keys(io.sockets.sockets).length)
  })
  socket.on('startVideo', function () {
    console.log('started video');
    io.emit('startTheVideo')
  })

  io.emit('hello')
  socket.on('started', function () {
    console.log('video started');
  })
});
