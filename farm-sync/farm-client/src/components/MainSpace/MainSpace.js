import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";

function MainSpace(props) {
    function handleDevice(state, device) {
        //console.log("Main:", state);
        props.handleDevice(state, device);
    }

    return (
        <>
            <div className="d-flex flex-row">
                <Sidebar />
                <div className="d-flex flex-column w-100">
                    <Navbar />
                    <Dashboard
                        handleDevice={handleDevice}
                        mVal={props.mVal}
                        tVal={props.tVal}
                        gVal={props.gVal}
                    />
                </div>
            </div>
        </>
    );
}

export default MainSpace;
