import React from "react";
import {Link} from "react-router-dom"

function Footer() {
  let year =  new Date().getFullYear();
  return (
    <div className="text-center py-4 footer">
        <h5><a href="https://www.linkedin.com/in/micky-rajkumar/" target="_blank" rel="noreferrer noopener">Micky Rajkumar</a> <span style={{fontSize:"1.5rem"}}> ©</span> {year}  | All Rights Reserved</h5>
    </div>
  );
}

export default Footer;
