import React from "react";
import './style.css';
import Programming from "./images/programmingincpp.jpg";


function bookCard (props){
    return(
        <div className="">
                <div className="img ">
                  <img src={props.img} alt={props.book_name} className="img-fluid" />
                  <div className="overlay">
                    <div className="text text-center px-2">
                      <h2 >{props.book_name}</h2>
                      <div className="pt-3">
                        <p className="text-warning">by</p>
                        <h4 className="btnn  text-primary">{props.Author_name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <form method = "POST">
                  <div className="px-5 d-flex justify-content-between mt-2">
                    <button className="btnn btn btn-primary" type="submit" name="issue" value="">Issue</button>
                    <button className="btn btn-danger" type="submit" name="delete" value="">Delete</button>
                  </div>
                </form>
         </div>
    )
}

export default bookCard;