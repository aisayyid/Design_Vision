
import { Header, Message } from "semantic-ui-react";
import GalleryCard from "../../components/GalleryCard/index";
import React, { useEffect, useState } from "react";
import axios from "axios";




export const GalleryPage = () => {
    const [images, setImages] = useState([])
const [image, setImage] = useState ("")

useEffect(() => {
  // getThems();
}, []);

axios.get("/gallerydisplay", 
{ 


}).then(data => {
  console.log(data)
})
  .catch(err => console.log(err));
    
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
