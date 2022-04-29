import React from "react";

function Card(props) {
  return (
    <div className="">
        <h2>{props.name}</h2>
        <img src={props.img} alt={props.name} />
        <p> {props.tel}</p>
        <p>{props.email}</p>
       
    </div>
  );
}

export default Card;
