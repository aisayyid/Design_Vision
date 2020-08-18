

import React from 'react';


// import { Header } from 'semantic-ui-react';
// import RegisterForm from "../../components/RegisterForm";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../actions/authActions";

const Search = () => {

    return (

<form action="/uploadFile" method="POST" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="myImage" accept= "image/*"/>
  <input type="submit" value="Upload Image" name="submit"/>
</form>

    
    )
}

export default Search;

    

