import React from "react";
import { Outlet, NavLink, Link, useNavigate} from "react-router-dom";


const Dashboards = () => {

    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem('Token');
        navigate('/login')
      }

    return (
        <>
            <div className="pt-2" style={{backgroundColor:"rgb(252 125 0)"}}>
                <div className=" text-light d-flex justify-content-between wid-95 m-auto">
                    <div className="text-center"><h3>Welcome to Maheikol</h3></div>
                    <div className=""><input type="button" onClick={logout} className="h2 text-light btn btn-outline-primary" value="Logout"/> </div>
                </div>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-sidebar mt-3">
                    <div className="dbd-side1">
                        <i className="fa fa-bars" style={{ fontSize: '30px', marginTop: 'auto', marginBottom: 'auto', marginRight: '20px' }}></i>
                        <div>
                            <Link to ="/">
                                <img className="dbdlogo" src={require("../images/MKLogo.png")} alt="logo" />
                                <img className="dbdTlogo" src={require("../images/textLogo.png")} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="dbd-side2">
                        <ul>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard">
                                    <i className="mr-3 fa fa-qrcode"></i><span> Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard/categories">
                                    <i className="fa fa-align-center"></i><span> Category</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard/books">
                                    <i className="fa fa-book"></i><span> Books</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard/users">
                                    <i className="fa fa-users"></i><span>Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard/issued-books">
                                    <i className="fa fa-address-book-o"></i><span> Issued Books</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end className={({ isActive }) => (isActive ? "active" : 'navlink1')} to="/dashboard/due-books">
                                    <i className="fa fa-address-book"></i><span> Due Books</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default Dashboards;