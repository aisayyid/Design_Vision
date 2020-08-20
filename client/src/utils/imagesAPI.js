// import axios from "axios";

// export default {

//  axios.get("/file")//test the server for a route
//     .then((res) => {
//     const data = res.data;
//     console.log(`${data} has been received`);
//     console.log(`labels array is now :${this.state.labels}`);
//     })
//     .catch(() => {
//                 alert("Error receiving data")
//      })

// }

// const labels = [];
// // Export an object containing methods we'll use for accessing the random user API
// export default {
//   getImagesByLabel: function(language) {
//     return new Promise((resolve, reject) => {
//       axios
//         .get("/file")
//         .then(res => {
//           const images = res.data;
//           const results = users.map(user => {
//             return {
//               login: user.login,
//               image: user.avatar_url,
//               language: language
//             };
//           });
//           resolve(results);
//         })
//         .catch(err => reject(err));
//     });
//   },
//   // Return a Promise to simulate an async call
//   getLanguagesList: function() {
//     return new Promise(resolve => {
//       resolve(languages);
//     });
//   }
// };

// // }