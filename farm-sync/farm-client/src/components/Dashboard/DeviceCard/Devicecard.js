import './Devicecard.css';
import { useState, useEffect } from 'react';

function Devicecard(props) {
    
    const [dState, setDState] = useState("OFF");

    useEffect(() => {
        fetch("http://localhost:3000/device/state", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            data.forEach(element => {
                
                if(element.Name == props.deviceName){
                    console.log("RAN")
                    setDState(element.State)
                }
            });
            
          })
          .catch((error) => console.log(error));
      }, []);
    function handleInput(e){
        if(dState == "off" || dState == "OFF"){
            props.handleDevice("ON", props.deviceName)
            setDState("ON")
            //console.log(props.deviceName)
        }
        else{
            props.handleDevice("OFF", props.deviceName)
            setDState("OFF")}
    }

    return (
        <>
            <div class="device-card-style" style={{ "background-color": props.color }}>
                <div class="device-card-body-style " >
                    <span className='font-weight-bold device-label-style'>{props.deviceName}</span>
                    <button type="button" onClick={e => handleInput(e, "value")} className='btn btn-outline-light device-btn'> <img className="icon-style" src={props.icon}></img></button>
                    <span className='fs-2 font-weight-bold value-style'><b>{dState}</b></span>
                </div>
            </div>
        </>
    );
}

export default Devicecard;