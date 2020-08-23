
import imagesAPI from "../../utils/imagesAPI"
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/index"




const Search = () => {

const [images, setImages] = useState([])
const [image, setImage] = useState ("")

useEffect(() => {
  // getThems();
}, []);

// function getThems(){
//   imagesAPI.getPictures()
//   .then(res => {
//     setImages(res.data)
//     console.log(res.data)
//   }
//     ).catch(err => console.log(err))
// }

const formSubmit = (e) => {
  e.preventDefault();
//new form obj
  const formData = new FormData();
//appending to form data obj a property called my img
  formData.append('myImage', image)
//form content type config
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
//a post call to /file
  imagesAPI.createPicture(formData, config)
      .then(res => {
        console.log("this is the dataaaa", res.data)
        setImages(res.data)
      })
      .catch(err => console.log(err))
}



    return (
<div>
{console.log(images)}
<form onSubmit={formSubmit}>
  Select image to upload:
  <input type="file" onChange = {(e) => setImage(e.target.files[0])} name="myImage" accept= "image/*" />
    <input type="submit" value="Upload Image" name="submit"/>
</form>
<div className="container">
<div className="card-deck row">
{images.map(img => (
<Card 
  image={img}
/>
))}
</div>
</div>
</div> 





    )
}

export default Search;

    

