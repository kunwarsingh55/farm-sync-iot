
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});













// const express = require('express');

// const server = express()
//     .use((req, res) => res.end("Hello"))
//     .listen(3000, () => console.log(`Listening on ${3000}`));


// const { Server } = require('ws');

// const sockserver = new Server({ port: 5000 });

// sockserver.on('connection', (ws) => {
//     console.log('New client connected!');
//     ws.on('close', () => console.log('Client has disconnected!'));
//     ws.on('message', function message(data) {
//         console.log('received: %s', data);
//       });
// });




// setInterval(() => {
//     sockserver.clients.forEach((client) => {
//         const data = JSON.stringify({ 'message': 'hello from server'});
//         client.send(data);
//     });
// }, 1000);


