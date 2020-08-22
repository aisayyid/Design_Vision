// import React from "react";
// import axios from "axios";

// class GetData extends React.Component {
//     state = {
//         imageName: "",
//         labels: []
//     }

//     componentDidMount = () => {
//         //right when this component mounts...
//         this.getImage();
//     }
//     //get one image
//     getImage = () => {
//         console.log("get image function fired...");//see if this works 
//         axios.get("/file")//test the server for a route
//             .then((res) => {
//                 const data = res.data;
//                 console.log(`${data} has been received`);
//                 this.setState({ labels: data });
//                 console.log(`labels array is now :${this.state.labels}`);
//             })
//             .catch(() => {
//                 alert("Error receiving data")
//             })
//     }
//     render() {
//         return (
//         <>
//             <h2>this is the best component ever</h2>;
//             {/* {this.state.labels.map(image => {
//             <p>{image.label}</p>   
//             })} */}
//         </>
//         )
//       }
    
// }

// export default GetData;