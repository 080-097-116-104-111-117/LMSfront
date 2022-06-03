import React from "react";
import './style.css';
import Python from "./images/python.jpg";
import USER from "./images/profileuser.png"
import LIBRARYCOVER from "./images/librarycover.jpg"
import {Link } from "react-router-dom";
import Auth from "../redux/common/isAuth"


function Profile() {
    // document.getElementById('spinner').style.display="none";


    const isAuth = Auth();
    console.log(isAuth.user)

    const sup = (sem) => {
        const st = "st";
        const nd = "nd";
        const rd = "rd";
        const th = "th";

        if (sem === 1) {
            return st;
        }
        if (sem === 2) {
            return nd;
        }
        if (sem === 3) {
            return rd;
        } else {
            return th;
        }
    }

    return (

        <section className="profileBody">
            {/* <div style={{backgroundColor:"#e5e5e5", width:"100%"}}>
                <div className="container-fluid " style={{width:"80%"}}>
                    <div className="container d-flex justify-content-center">
                        <div className="">
                            <Link to="/">
                                <img className="logo img-fluid" src={LOGO} alt="logo"/>
                            </Link>
                        </div>
                        <div className="py-3">
                            <Link to="/">
                                <img className="text-logo img-fluid" src={TEXTLOGO} alt="logo"/>
                            </Link>
                        </div>

                    </div>
                </div>
            </div> */}
            <section className="h-100 gradient-custom-2 profileBody">
                <div className="container h-100 profilew">
                    <div className="h-100" style={{width:"100%"}}>
                        <div className="profile-card">
                            <div className="card profileBody">
                                <div className="rounded-top text-white d-flex flex-row" style={{height: "305px"}}>
                                    <img className="img-fluid" src={LIBRARYCOVER} style={{width: "100%"}} alt="library cover"/>
                                </div>
                                <div className="d-flex flex-column align-items-center mb-3">
                                    <div className="d-flex" style={{width: "210px", backgroundColor:"#00000000", marginTop:"-100px"}}>
                                        <img src={USER} alt="Generic placeholder" className="img-fluid img-thumbnail" style={{margin:"5px",width: "200px", borderRadius: "50%", Zindex: "1"}}/>
                                    </div>
                                    <div className="profile text-center">
                                            <h5 className=" my-2" style={{fontSize: "25px"}}>{isAuth.user.user_name}</h5>
                                            <button style={{fontSize:"20px"}} id="show" type="button" className="btn btn-outline-primary mt-2" data-mdb-ripple-color="dark">
                                                Edit profile
                                            </button>
                                    </div>
                                    {/* <div id="hidden1" className="py-3 rounded">
                                    <form action="/">
                                        <div className="mt-3 px-3"> <input type="text" className="form-control" name="username" placeholder="Username"> </div>
                                        <div className="mt-3 px-3"> <input type="text" className="form-control" placeholder="Address"> </div>
                                        <div className="input-group px-3 mt-3 justify-content-between"> 
                                          <select name="course" className="select rounded px-2">
                                            <option value="none" selected disabled hidden>Select the Course</option>
                                            <option value="MCA">MCA</option>
                                            <option value="BCA">BCA</option>
                                            <option value="DCA">DCA</option>
                                            <option value="Other">Other</option>
                                          </select>
                                          <select name="semester" className="select rounded px-2">
                                            <option value= selected disabled hidden>Semester</option>
                                            <option value=1>1</option>
                                            <option value=2>2</option>
                                            <option value=3>3</option>
                                            <option value=4>4</option>
                                            <option value=5>5</option>
                                            <option value=6>6</option>
                                          </select> 
                                          <select name="gender" className="select rounded px-2">
                                            <option value="none" selected disabled hidden>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                          </select>
                                        </div>
                                        <div className="input-group px-3 mt-3 justify-content-around"> 
                                            <div style="margin-right: 5px;"> <input type="number" className="form-control" placeholder="Roll number"> </div>
                                            <div className=""> <input type="number" className="form-control" placeholder="Mobile Number"> </div>
                                          </div>
                                          <div className="d-flex">
                                            <div className="mt-3 d-grid px-3"> <button id="hide1" type="button" className="btn btn-light btn-block btn-signup text-uppercase"> <span>Cancel</span> </button> </div>
                                            <div className="mt-3 d-grid px-3"> <button type="submit" className="btn btn-primary btn-block btn-signup text-uppercase"> <span>Save</span> </button> </div>
                                          </div>
                                    </form>
                                </div>*/}
                                </div> 
                                    <div className="d-flex justify-content-center text-center py-1">
                                        <div className="mb-5 text-start">
                                            <h4 className="lead text-center fw-normal">About</h4>
                                            <div className="about">
                                                <p className="font-italic">{isAuth.user.course ? isAuth.user.course :<> BCA</>} {isAuth.user.sem ? isAuth.user.sem : 0}<sup>{sup(isAuth.user.sem)}</sup> semaster</p>
                                                <p className="font-italic">Address: {isAuth.user.default_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0">Recent books</p>
                                            <p className="mb-0"><Link to="#!" className="text-muted">Show all</Link></p>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"200px"}}>
                                           <h1 className="text-warning"> Nothing to show</h1>
                                        </div>
                                            <div className="profileBook">
                                               
                                            </div>
                                    </div>
                            </div >
                        </div >
                    </div >
                </div>
            </section >
        </section >

    )
}

export default Profile;