
import { Header, Message } from "semantic-ui-react";
import GalleryCard from "../../components/GalleryCard/index";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import imagesAPI from "../../utils/imagesAPI"
import { useSelector } from "react-redux";



export const GalleryPage = () => {
const user = useSelector(state => state.auth.currentUser);
    console.log("this is the user" , user)
const [images, setImages] = useState([])
const [image, setImage] = useState ("")

useEffect(() => {
  savedPics();
}, []);

function savedPics(){
imagesAPI.galleryPictures(user._id)
.then(res => {
setImages(res.data.gallery)
console.log("These should be pictures",res.data)
})
  .catch(err => console.log(err));
}
    
    return (
        <>
            <Message className="message-container" size="huge" secondary="true">
                <Header size="huge"> Personal Gallery </Header>
                <p>This is a Protected Route</p>
            </Message>
            <div className="card-deck row">
                {images.map(img => (
                    <GalleryCard
                        image={img}
                    />
                ))}
            </div>
        </>

    )
}

export default GalleryPage;
