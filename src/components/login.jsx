import './style.css';
import LOGO from "./images/MKLogo.png";
import TEXTLOGO from "./images/textLogo.png";
import Library from "./images/library1.jpg";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


function Login() {


  const [formValue, setformValue] = useState({
    email: '',
    password: ''
  });
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const loginFormData = new FormData();
    // loginFormData.append("email", formValue.email)
    // loginFormData.append("password", formValue.password)
    // console.log(loginFormData)
    const loginFormData = {
      email: formValue.email,
      password: formValue.password,
    }
    console.log(loginFormData)


    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/login/",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("token:", response.data.token)
      response.data.token && localStorage.setItem('Token', JSON.stringify(response.data.token))
      history('/')
    } catch (error) {
      console.log("error:", error)
      document.getElementById('err').style.display = "block";
    }


  }

const hideerr = () => {
  document.getElementById('err').style.display = "none";
}


  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });

  }



  document.getElementById('spinner').style.display = "none";
  document.getElementById('root').style.display = "block";

  // return auth ? <Outlet /> : <Navigate to="/login" />;
  // console.log("token:", token)

  return (
    <div className="d-flex justify-content-center login-div">
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center" >
          <div className="col col-xl-10 p-0 login-divv">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={Library} alt="login form" className="img-fluid " />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
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

                    <h5 className="text-center fw-normal my-3 pb-3 login-divvvvv">Sign into your account</h5>
                    <div id="err">
                    <div className="alert alert-danger alert-dismissible d-flex align-items-center fade show">
                      <i className="bi-exclamation-octagon-fill"></i>
                      <strong className="mx-2">Error!</strong> Email or Password is Incorrect!!
                      <button onClick={hideerr} type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    </div>

                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="login-email">Email address:</label>
                        <input type="email" id="login-email" className="form-control form-control-lg" name="email" value={formValue.email} placeholder="Enter your email address" onChange={handleChange} required />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" className="form-control form-control-lg" name="password" value={formValue.password} onChange={handleChange} placeholder="Enter your password" required />
                      </div>

                      <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-lg btn-block justify-content-center login1">Login</button>
                      </div>
                    </form>
                    <div className="text-center mt-3">
                      <p><Link className="h1 small text-muted" to="#!">Forgot password?</Link></p>
                      <p className="pb-lg-2">Don't have an account? <Link to="/signup" >Sign Up</Link></p>
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

export default Login;