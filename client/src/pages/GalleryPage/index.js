
import { Header, Message } from "semantic-ui-react";
import GalleryCard from "../../components/GalleryCard/index";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import imagesAPI from "../../utils/imagesAPI"
import { useSelector } from "react-redux";
import "./gallery.css"



export const GalleryPage = () => {
    const user = useSelector(state => state.auth.currentUser);
    console.log("this is the user", user)
    const [images, setImages] = useState([])
    const [image, setImage] = useState("")

    useEffect(() => {
        savedPics();
    }, []);

    function savedPics() {
        imagesAPI.galleryPictures(user._id)
            .then(res => {
                setImages(res.data.gallery)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid" id="galleryjumbo">
                <h1 className="display-4">My Assets</h1>

            </div>
            <div className="container">
                <div className="card-deck row">
                    
                    {images.map(img => (
                        <GalleryCard
                            image={img}
                            refreshImage={savedPics}
                        />
                    ))}
                </div>
            </div>
        </>

    )
}

export default GalleryPage;
