const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.end('Hello');
});

io.on('connection', (socket) => {
  console.log('A client Connected');
  socket.on('disconnect', ()=>{
    console.log("Disconnected");
  })
  socket.on('message', (data)=>{
    console.log(data);
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});