import React from "react";
import axios from "axios";

class getData extends React.Component {
    state = {
        imageName: "",
        labels: []
    }

    componentDidMount = () => {
        this.getImage();
    }

    getImage = () => {
        axios.get("/uploadFile")
            .then((res) => {
                const data = res.data;
                console.log("data has been received");
                this.setState({ labels: data });
            })
            .catch(() => {
                alert("Error receiving data")
            })
    }
    
}

export default getData;