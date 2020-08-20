import React from 'react';
import GetData from '../../components/getData';
//import images api file so we can access the function



// import Card from "../../components/Card/index"

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
// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
    
//     reader.onload = function(e) {
//       $('#blah').attr('src', e.target.result);
//     }
    
//     reader.readAsDataURL(input.files[0]); // convert to base64 string
//   }
// }

// $("#imgInp").change(function() {
//   readURL(this);
// });

const Search = () => {
//get images  useEffect hook
//call the api getImages function
    return (
<div>

<form action="/uploadFile" method="POST" encType="multipart/form-data">
  Select image to upload:
  <input type="file" name="myImage"  accept= "image/*" />
    <input type="submit" value="Upload Image" name="submit"/>

  {/* <input type="submit" onClick={() => getData()} value="Upload Image" name="submit"/> */}
</form>

<GetData />
</div>   

    )
}

export default Search;

    

