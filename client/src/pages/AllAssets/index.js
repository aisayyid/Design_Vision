import React, { useEffect, useState } from "react";
import { Header, Message, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import imagesAPI from "../../utils/imagesAPI";
import Card from "../../components/Card/index";
import "./allassets.css";
import { ToastContainer } from 'react-toastify';

export const AllAssets = () => {
  // access to the isAuthenticated property from the auth reducer state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const showLoginBtn = () => {
    if (!isAuthenticated) {
      return (
        <Button color="black" animated secondary>
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
      )
    }
  }

  const [images, setImages] = useState([])
  const [image, setImage] = useState("")

  useEffect(() => {
    getThems();
  }, []);

  function getThems() {
    imagesAPI.getPictures()
      .then(res => {
        setImages(res.data)
        console.log(res.data)
      }
      ).catch(err => console.log(err))
  }




  return (
    <div>
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
      <div className="jumbotron jumbotron-fluid" id="alljumbo">
        <h1 className="display-4">All Assets</h1>

      </div>
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
};

export default AllAssets;
