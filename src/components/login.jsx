import React from "react";
import './style.css';
import LOGO from "./images/MKLogo.png"
import TEXTLOGO from "./images/textLogo.png"
import Library from "./images/library1.jpg"


function Login(){
    return(
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
                        <a href="">
                          <img className="logo img-fluid" src={LOGO} alt="logo"/>
                        </a>
                      </div>
                      <div className="py-3 mr-3" >
                        <a href="/">
                          <img className="text-logo img-fluid" src={TEXTLOGO} alt="logo"/>
                        </a>
                      </div>
                    </div>
                    
                    <h5 className="text-center fw-normal my-3 pb-3 login-divvvvv">Sign into your account</h5>
                    
                    <form action="/login" method="post">
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="login-email">Email address:</label>
                        <input type="email" id="login-email" className="form-control form-control-lg" name="email" placeholder="Enter your email address" required/>
                      </div>
    
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" className="form-control form-control-lg" name="password" placeholder="Enter your password" required/>
                      </div>
    
                      <div className="pt-1 mb-4">
                        <button type="submit" className="btn btn-lg btn-block justify-content-center login1">Login</button>
                      </div>
                    </form>
                    <div className="text-center mt-3">
                      <p><a className="h1 small text-muted" href="#!">Forgot password?</a></p>
                      <p className="pb-lg-2">Don't have an account? <a href="/signup" >Sign Up</a></p>
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