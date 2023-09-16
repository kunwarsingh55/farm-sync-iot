const express = require("express");
const connectDb = require("./db");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
// Models
const device = require("./models/device");
const mSensor = require("./models/mSensor");
const tSensor = require("./models/tSensor");
const hSensor = require("./models/hSensor");

const app = express();
app.use(express.json());
// app.use("/api/sensor-data", sensorData);
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

connectDb();

// Enp-point for getting sensor data from raspberry pi
app.post("/sensorData", async (req, res) => {
  try {
    if (req.body) {
      let mData = await mSensor.create({
        value: req.body.moisture,
      });
      let tData = await tSensor.create({
        value: req.body.temperature,
      });
      let hData = await hSensor.create({
        value: req.body.humidity,
      });

      console.log("POST /sensorData OK");
      res.end("/sensorData OK");
    }
  } catch {
    console.log("/sensorData Error");
    res.end("/sensorData Error");
  }
});

device.watch().on("change", handelDState);
async function handelDState(data) {
  // console.log(data.documentKey._id.toHexString())
  id = data.documentKey._id.toHexString();
  update_device = await device.findById((_id = data.documentKey._id));
  // device = data.updateDescription
  state = data.updateDescription.updatedFields.State;
  setTimeout(() => {
    io.sockets.emit("device", { name: update_device.Name, state: state });
  }, 100);
}

mSensor.watch().on("change", handelMState);
async function handelMState(data) {
  setTimeout(() => {
    io.sockets.emit("moisture", data.fullDocument.value);
  }, 1000);
}

tSensor.watch().on("change", handelTState);
async function handelTState(data) {
  setTimeout(() => {
    io.sockets.emit("temperature", data.fullDocument.value);
  }, 3000);
}

app.get("/", (req, res) => {
  res.end("Farm Sync IoT Online");
});

app.get("/device/state",async (req, res) => {
  device_list = await device.find({})
  //console.log(device_list)
  res.json(device_list)

});

async function updateState(data) {
  await device.updateOne(
    { Name: data.name },
    {
      State: String(data.state).toUpperCase(),
    }
  );
}

io.on("connection", (socket) => {
  console.log("A client Connected");
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  socket.on("sensordata", (data) => {
    console.log("Message from pi : ", data.data);
  });
  socket.on("DeviceChange", (data) => {
    //data = JSON.parse(data);
    console.log(data)
    console.log("Device Change : ", data.name);
    updateState(data);
  });
});


async function hist() {
  moisture_histdata = await mSensor.find({}).sort({ _id: -1 }).limit(10)

  let historydata = []
  let mhist = []
  let thist = []
  
  moisture_histdata.forEach(element => {
    mhist.push(element.value)
  });

  temperature_histdata = await tSensor.find({}).sort({ _id: -1 }).limit(10)
  
  temperature_histdata.forEach(element => {
    thist.push(element.value)
  });

  for(let i=0; i<10; i++){
    obj = {}
    obj.name = i + 1
    obj.Moisture = mhist[i]
    obj.Temperature = thist[i]

    historydata.push(obj)
  }

  //console.log(historydata)
  
  io.sockets.emit("graphdata", historydata);


    // Print or process the retrieved documents here
   // console.log('Last 10 documents:', documents);
}

// Set an interval to run myFunction every second (1000 milliseconds)
setInterval(hist, 3000);

server.listen(3000, () => {
  console.log("listening on : 3000");
});
