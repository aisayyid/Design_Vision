import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";


function GalleryCard({ image }) {
const user = useSelector(state => state.auth.currentUser);
  //function
  console.log("this is the user" , user)

  componentDidMount(){
    //use axios to post to user dashboard
    axios.get("/gallerydisplay",
    { //set user to user id
     user: user._id,
    //set gallery to image name
      gallery:[]
    //push image into gallery
    }).then(data => {
      console.log(data)
    })
      .catch(err => console.log(err));
}


  return (
    <div className = "col-3">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image.imageName}`} className="card-img-top" alt="..."/>
    <div className="card-body">
    <p>This is a card</p>
    </div>
    <button type="button" className="btn btn-primary btn-sm">Remove from Gallery</button>
    </div>
  </div>
  );
}

export default GalleryCard;