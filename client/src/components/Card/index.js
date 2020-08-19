import React from "react";
import "./style.css";
// const router = require("express").Router();
// const Image = require ("/models/images.js")

// let fileExt = [];

function Card(props) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: props.image ? `url(${props.image})` : "none"
      }}
    >
    </div>
  );
}

export default Card;