import './Navbar.css'

function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg text-white navbar-style" >
                <div className="container-fluid flex">
                    <div className="collapse navbar-collapse mt-4 mt-md-0" style={{ 'textAlign': 'center' }} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active fs-4 " aria-current="page" href="/">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Navbar;