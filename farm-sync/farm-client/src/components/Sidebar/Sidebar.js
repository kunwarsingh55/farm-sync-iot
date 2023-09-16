import React from "react";
import farmLogo from './farm.png'
import './Sidebar.css';

function Sidebar(props) {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 mb-7 sidebar-style">
                <div className="d-flex flex-row align-items-center justify-content-center p-2 rounded ">
                    <img src={farmLogo} className="mx-2 logo-style" alt="" ></img>
                    <div className="vr" style={{ "height": "auto" }}></div>
                    <a className="navbar-brand mx-2 fs-4" href="/"><b>FarmSync</b></a>
                </div>
                <div style={{ 'height': "60px" }}></div>
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <a href="/" className="nav-link active" aria-current="page">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            History
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Settings
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Help
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"></svg>
                            Customers
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default Sidebar;
