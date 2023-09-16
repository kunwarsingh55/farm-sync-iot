import React from "react";
import { LineChart, Line } from 'recharts';
import Infocard from "./InfoCard/Infocard";
import Devicecard from "./DeviceCard/Devicecard";
import tempIcon from "./InfoCard/temp.png";
import moistureIcon from "./InfoCard/moisture.png";
import dripIcon from "./DeviceCard/drip.png";
import sprinkIcon from "./DeviceCard/sprinkler.png";
import './Dashboard.css';
import Graphcard from "./Graphcard/Graphcard";


 

function Dashboard(props) {
    function handleDevice(state, device) {
        // console.log("Dash:", state)
        props.handleDevice(state, device)
    }

    return (
        <>
            <div className="d-flex flex-column dash">
                <div className="d-flex flex-row">
                    <Infocard color="#d0eff5" value={props.tVal} sensorName={"Air Temperature"} icon={tempIcon} />
                    <Infocard color="#d1eedb" value={props.mVal} sensorName={"Soil Moisture"} icon={moistureIcon} />
                    <Devicecard deviceName="Water Pump" handleDevice={handleDevice} deviceState="OFF" color="#e2e2e2" icon={dripIcon} />
                    <Devicecard deviceName="Drip System" handleDevice={handleDevice} deviceState="OFF" color="#e2e2e2" icon={sprinkIcon} />
                </div>


                <div className="d-flex flex-row">

                    <Graphcard color="#f5efff" data={props.gVal} />
                </div>








            </div>



        </>
    )
}


export default Dashboard;
