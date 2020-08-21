import React from 'react';
import { Header, Message } from "semantic-ui-react";


export const GalleryPage = () => {
    return (
        <>
            <Message className="message-container" size="huge" secondary="true">
                <Header size="huge"> Personal Gallery </Header>
                <p>This is a Protected Route</p>
            </Message>
        </>
    )
}

export default GalleryPage;
