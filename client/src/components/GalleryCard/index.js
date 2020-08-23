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
    <div className = "col-sm-4">
    <div className="card" style={{width: "18rem;"}}>
    <img src={`./uploads/${image}`} className="card-img-top" alt="..." id="galleryimg"/>
   
    <button type="button" onClick = {(e) => imageDelete(image.imageName)} className="btn btn-primary btn-sm" id="delete">Remove from Gallery</button>
    </div>
  </div>
  );
}

export default GalleryCard;