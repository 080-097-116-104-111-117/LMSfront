import React from "react";
import { Outlet, Link } from "react-router-dom";
import './style.css';
import LOGO from './images/MKLogo.png';
import TEXTLOGO from './images/textLogo.png';
import HOME from "./images/book1.jpg"

function Header() {
  return (
    <div style={{ backgroundColor: "#001254" }}>
      <div className="App">
        <div className="homeImg">
          <img src={HOME} alt="home" />
          <div className="middle">
            <div className="middle1">
              <div className="d-flex mb-3 justify-content-center">
                <div className="">
                  <Link to="/">
                    <img className="logo img-fluid" src={LOGO} alt="logo" />
                  </Link>
                </div>
                <div className="py-3">
                  <Link to="/">
                    <img className="text-logo img-fluid" src={TEXTLOGO} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="text1"><h1><q>The only thing that you absolutely have to know, is the location of the library.</q></h1></div>
            </div>
          </div>
        </div>

      </div>
      <Outlet />
    </div>
  );
}

export default Header;
