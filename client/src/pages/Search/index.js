import React from 'react';
import Card from "../../components/Card/index"

//  function getData (){
//     let url = "localhost:3000/uploadFile"
//     fetch(url, {
//         method: "POST",
//         mode: "no-cors",
        
//         headers: {
//             'Context-Type': 'multipart/form-data'
//         }
//     }).then(response => response.json())
//     .then(result => {console.log(result)})
// }

// action="/uploadFile" method="POST" encType="multipart/form-data"
const Search = () => {

    return (
<div>

<form action="/uploadFile" method="POST" encType="multipart/form-data">
  Select image to upload:
  <input type="file" name="myImage" accept= "image/*"/>
    <input type="submit" value="Upload Image" name="submit"/>

  {/* <input type="submit" onClick={() => getData()} value="Upload Image" name="submit"/> */}
</form>

<div>

<Card />

</div>
</div>
    

    )
}

export default Search;

    

