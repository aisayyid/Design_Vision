import React from "react";
import "./style.css";


function GalleryCard({ image }) {

  return (
    <div className = "col-3">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image}`} className="card-img-top" alt="..."/>
    <div className="card-body">
    <p>This is a card</p>
    </div>
    <button type="button" className="btn btn-primary btn-sm">Remove from Gallery</button>
    </div>
  </div>
  );
}

export default GalleryCard;