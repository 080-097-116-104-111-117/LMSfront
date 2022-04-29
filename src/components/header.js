import React from "react";
import './style.css';
import LOGO from './images/MKLogo.png';
import TEXTLOGO from './images/textLogo.png';
import USERIMG from "./images/user.png";

function Header() {
  return (
    <div className="App">
          <div className="container-fluid " >
        <div className="container d-flex justify-content-between">
          <div className="d-flex">
            <div className="">
              <a href="/">
                <img className="logo img-fluid" src={LOGO} alt="logo"/>
              </a>
            </div>
            <div className="py-3">
              <a href="/">
                <img className="text-logo img-fluid" src={TEXTLOGO} alt="logo"/>
              </a>
            </div>
          </div>
          <div className="search-box">
            <form className="d-flex pt-4">
              <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search"/>
              <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
          <div className="user d-flex justify-content-end py-3">
              <img src={USERIMG} className="img-fluid" alt="logo" />
            <div >
              <form action="/logout" method="post">
                <button className="btn btn-lg text-light  mt-1 justify-content-center" type="submit">LogOut</button>
              </form>
            </div>
          </div>

        </div>
      </div>
       
    </div>
  );
}

export default Header;
