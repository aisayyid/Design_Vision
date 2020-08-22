import React from "react";
import "./style.css";


function GalleryCard({ image }) {

  const user = useSelector(state => state.auth.currentUser);
  //function
  console.log("this is the user" , user)

  function imageDelete(imageName){
    //delete method
    axios.delete("/gallerydelete",
    { //using id
     user: user._id,
    //delete image from gallery array
      gallery: imageName
    }).then(data => {
      console.log(data)
    })
      .catch(err => console.log(err));
  };

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