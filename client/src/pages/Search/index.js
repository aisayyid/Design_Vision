import imagesAPI from "../../utils/imagesAPI"
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/index";
import "./search.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import PacmanLoader from "react-spinners/PacmanLoader";


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&

    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px"
      }}
    >
      <PacmanLoader type="PacmanLoader" color="#02005B" height="100" width="100" />
    </div>

  );
}

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
    trackPromise(
      imagesAPI.createPicture(formData, config)
        .then(res => {
          setImages([...new Set(res.data)])
        })
        .catch(err => {
          console.log(err)
          toast.error("Must be jpg/jpeg/png/gif!")

        }))
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
        <h1 className="display-4" id="searchh1"><span>Search Assets</span></h1>
        <p><span>Choose an image to upload, then press upload image.  We will then search the database for images most visually similar to yours.</span></p>
        <form onSubmit={formSubmit}>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} name="myImage" accept="image/*" />
          <button type="submit button" value="Upload Image" name="submit" class="btn btn-primary">Upload Image</button>

        </form>

      </div>
      <LoadingIndicator />

      <div className="container">
        <div className="card-deck row">
          {images.map(img => (
            <Card
              image={img}
            />
          ))}
        </div>
      </div>

    </>
  )
}

export default Search;



