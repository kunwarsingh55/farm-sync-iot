import './Graphcard.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function Graphcard(props) {
    return (
        <>

            <div class="graph-card-style" style={{ "background-color": props.color }}>
                <div class="graph-card-body-style " >
                    <span className='font-weight-bold graph-label-style'>History</span>
                    <LineChart
                        width={500}
                        height={300}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Temperature"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="Moisture" stroke="#82ca9d" />
                    </LineChart>

                </div>
            </div>

        </>
    );
}

export default Graphcard;