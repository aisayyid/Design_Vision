
import imagesAPI from "../../utils/imagesAPI"
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/index";
import { Header, Message } from "semantic-ui-react";
import "./search.css";

import { ToastContainer } from 'react-toastify';

const Search = () => {


  const [images, setImages] = useState([])
  const [image, setImage] = useState("")

  useEffect(() => {
    // getThems();
  }, []);

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
        setImages([...new Set(res.data)])
      })
      .catch(err => {
         console.log(err)
      })
  }


  return (
    <>
    <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
       <div className="jumbotron jumbotron-fluid" id="searchjumbo">
  <h1 className="display-4" id="searchh1">Search Assets</h1>


        <p>Choose an image to upload, then press upload image.  We will then search the database for images most visually similar to yours.</p>
        <form onSubmit={formSubmit}>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} name="myImage" accept="image/*"/>
          <button type="submit button" value="Upload Image" name="submit" class="btn btn-primary">Upload Image</button>
        </form>
        </div>
      <div>
    


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


    </>


  )
}

export default Search;



