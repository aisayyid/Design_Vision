import React from "react";
import "./style.css";
import imagesAPI from "../../utils/imagesAPI"
import { useSelector } from "react-redux";


function GalleryCard({ image }) {

  const user = useSelector(state => state.auth.currentUser);
  //function
  console.log("this is the user" , user)

  function imageDelete(){
    //delete method
    imagesAPI.deletePicture(user._id)
    .then(res => {

    console.log("These should be pictures",res)
    })
      .catch(err => console.log(err));
    }

  return (
    <div className = "col-3">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image}`} className="card-img-top" alt="..."/>
    <div className="card-body">
 
    </div>
    <button type="button" onClick = {(e) => imageDelete(image.imageName)} className="btn btn-primary btn-sm">Remove from Gallery</button>
    </div>
  </div>
  );
}

export default GalleryCard;