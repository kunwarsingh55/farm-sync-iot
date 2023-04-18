const express = require('express');
const app = express();
app.use(express.json());

//Server with socketIO cap
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Database 
const connectDb = require('./db');
const device = require('./models/device');
const mSensor = require('./models/mSensor');
const tSensor = require('./models/tSensor');

connectDb();


//routes
const sensorData = require("./routes/sensorData");
app.use('/api/sensor-data', sensorData);


device.watch().
  on('change', handelDState);
async function handelDState(data) {
  state = data.updateDescription.updatedFields.State
  setTimeout(() => {
    io.sockets.emit("drip", state);
  }, 100)
}




mSensor.watch().
  on('change', handelMState);
async function handelMState(data) {
  setTimeout(() => {
    io.sockets.emit("moisture", data.fullDocument.value);
  }, 1000)
}

tSensor.watch().
  on('change', handelTState);
async function handelTState(data) {
  setTimeout(() => {
    io.sockets.emit("temperature", data.fullDocument.value);
  }, 3000)

}



app.get('/', (req, res) => {
  res.end("Hello from server");
})

async function updateState(data) {
  await device.updateOne({ Name: "Drip" }, {
    State: String(data).toLowerCase()
  });
}

io.on('connection', (socket) => {
  console.log('A client Connected');
  socket.on('disconnect', () => {
    console.log("Disconnected");
  })
  socket.on("message", (data) => {
    console.log("Message from pi : ", data.response);
    io.sockets.emit("pi", data.response);
  })
  socket.on("reactmessage", (data) => {
    console.log("Message from react : ", data);

  })
  socket.on("dripChange", (data) => {
    console.log("drrip change");
    updateState(data)

  })


});

setInterval(() => {

}, 1000);

server.listen(3000, () => {
  console.log('listening on *:3000');
});






