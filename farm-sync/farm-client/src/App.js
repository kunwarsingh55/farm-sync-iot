
import MainSpace from './components/MainSpace/MainSpace';
import io from 'socket.io-client';
import { useEffect, useState } from "react";
const socket = io.connect("ws://localhost:3000", { transports: ['websocket'] });

socket.io.on('connect', () => {
  console.log("Socket Connected")
})

function App() {

  const [moistureValue, setMoistureValue] = useState("");
  const [temperatureValue, setTemperatureValue] = useState("");
  const [graphdata, setGraphData] = useState({});

  useEffect(() => {
    socket.on("temperature", (data) => {
      setTemperatureValue(data);
    })
    socket.on("moisture", (data) => {
      setMoistureValue(data);
    })
    socket.on("graphdata", (data) => {
      setGraphData(data);
      console.log(data)
    })
  }, [socket])

  function handleDevice(state, device) {
    //console.log("Device:", device)
    //console.log("State :", state)
    socket.emit("DeviceChange", {"name":device, "state":state});
  }

  return (
    <>
      <MainSpace handleDevice={handleDevice} mVal={moistureValue} tVal={temperatureValue} gVal={graphdata}/>
    </>
  );
}

export default App;
