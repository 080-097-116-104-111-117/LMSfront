import React, { useState } from "react";
import './style.css';
import LOGO from "./images/MKLogo.png"
import TEXTLOGO from "./images/textLogo.png"
import Library from "./images/library1.jpg"
import { Link } from 'react-router-dom';
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Register() {
    const navigate = useNavigate();

    const [formValue, setformValue] = useState({
        user_name: '',
        email: '',
        password: '',
        default_address: '',
        course : '',
        sem: '',
        gender: '',
        roll_no: '',
        mobile: '',

    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginFormData = {
            user_name: formValue.user_name,
            email: formValue.email,
            password: formValue.password,
            default_address: formValue.default_address,
            course: formValue.course,
            sem: formValue.sem,
            gender: formValue.gender,
            roll_no: formValue.roll_no,
            mobile: formValue.mobile,
        }
        console.log(loginFormData)





        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/register/",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("request:", response.request.onloadend.onprogress)
            console.log("response:", response);
            localStorage.setItem('Token', JSON.stringify(response.data.token))
            navigate('/')
        } catch (error) {
            console.log("error:", error)
            // console.log("user: ", user)
        }
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });

    }





    document.getElementById('spinner').style.display = "none";
    return (
        <div className="d-flex justify-content-center signupCard">
            <div className="d-flex">
                <div>
                    <div className="container py-5 ">
                        <div className="row d-flex justify-content-center align-items-center" >
                            <div className="col col-xl-10 p-0 colcard" >
                                <div className="card card1">
                                    <div className="row g-0">
                                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                                            <img className="img-fluid imgsign" src={Library} alt="login form" />
                                        </div>
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                            <div className="card-body text-black">
                                                <div className="container d-flex justify-content-center">
                                                    <div className="">
                                                        <Link to="/">
                                                            <img className="logo img-fluid" src={LOGO} alt="logo" />
                                                        </Link>
                                                    </div>
                                                    <div className="py-3 mr-3" >
                                                        <Link to="/">
                                                            <img className="text-logo img-fluid" src={TEXTLOGO} alt="logo" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="container-fluid d-flex justify-content-center align-items-center h-100 my-4">
                                                    <div className="text-center py-4">
                                                        <div> <span>Already have an account?</span> <Link to="/login" className="text-decoration-none">Sign in</Link> </div>
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="text" className="form-control" name="user_name" value={formValue.user_name} placeholder="Username" />  </div>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="email" className="form-control" name="email" placeholder="Email"  value={formValue.email} /> </div>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="password" className="form-control" name="password"  value={formValue.password} placeholder="Password" />
                                                            </div>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="text" className="form-control" name="default_address"  value={formValue.default_address} placeholder="Address" /> </div>
                                                            <div className="input onChange={handleChange}-group px-3 mt-3 justify-content-between">
                                                                <select onChange={handleChange} name="course"  value={formValue.course} className="select rounded mx-3">
                                                                    <option value ="" defaultValue= {formValue.course} disabled hidden>Select the Course</option>
                                                                    <option value="MCA">MCA</option>
                                                                    <option value="BCA">BCA</option>
                                                                    <option value="DCA">DCA</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                                <select onChange={handleChange} name="sem"  value={formValue.sem} className="select rounded mx-3">
                                                                    <option value="" defaultValue= {formValue.sem}  disabled hidden>Semester</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                </select>
                                                                <select onChange={handleChange} name="gender"  value={formValue.gender} className="select rounded mx-3">
                                                                    <option value="" defaultValue= {formValue.gender} disabled hidden>Gender</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="number" name="roll_no"  value={formValue.roll_no} className="form-control rounded" placeholder="Roll number" /> </div>
                                                            <div className="mt-3 px-3"> <input onChange={handleChange} required type="number" name="mobile"  value={formValue.mobile} className="form-control rounded" placeholder="Mobile Number" /></div>
                                                            <div className="mt-3 d-grid px-3"> <button type="submit"
                                                                className="btn btn-primary btn-block btn-signup text-uppercase"> <span>Signup</span> </button> </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
