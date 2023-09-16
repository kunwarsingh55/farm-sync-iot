import './Infocard.css';


function Infocard(props) {
    return (
        <>
            <div class="card-style" style={{ "background-color": props.color }}>
                <div class="card-body-style" >
                    <div className='card-col'>
                        <div> <img className="icon-style" src={props.icon}></img></div>
                        <span className='fs-2 font-weight-bold value-style'><b>+{props.value}</b>{props.sensorName==='Air Temperature'?'°C':' ~'}</span>
                        <br/>
                        <span className='font-weight-bold label-style'>{props.sensorName}</span>
                    </div>   
                    <div className='badge-style'>Good</div>
                </div>
            </div>
        </>
    );
}

export default Infocard;


