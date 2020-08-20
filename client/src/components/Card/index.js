import React from "react";
import "./style.css";
// const router = require("express").Router();
// const Image = require ("/models/images.js")

// let fileExt = [];

function Card({ image }) {
  return (
    <div className = "col-3">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image.imageName}`} className="card-img-top" alt="..."/>
    <div className="card-body">
      {image.labels.map(label => (
        <span className="badge badge-pill badge-info">{label}</span>
      ))}
    </div>
    <button type="button" class="btn btn-primary btn-sm">Save to Gallery</button>
    </div>
  </div>
  );
}

export default Card;