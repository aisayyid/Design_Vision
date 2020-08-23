import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";


function Card({ image }) {
const user = useSelector(state => state.auth.currentUser);
  //function
  console.log("this is the user" , user)

  function imageSubmit(imageName){
    //use axios to post to user dashboard
    axios.post("/gallery",
    { //set user to user id
     user: user._id,
    //set gallery to image name
      gallery: imageName
    //push image into gallery
    }).then(data => {
      console.log(data)
    })
      .catch(err => console.log(err));
  };


  return (
    <div className = "col-4">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image.imageName}`} className="card-img-top" alt="..."/>
    <div className="card-body">
      {image.labels.map(label => (
        <span className="badge badge-pill badge-info">{label}</span>
      ))}
    </div>
    <button type="button" onClick = {(e) => imageSubmit(image.imageName)} className="btn btn-primary btn-sm">Save to Gallery</button>
    </div>
  </div>
  );
}

export default Card;