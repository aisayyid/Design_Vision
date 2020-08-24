// const globalImageObj= {};
// const arrayToSort = [];
// let arrayOfMatches = [];
// const confidenceArray = [];
// let imagesWithConfidence = [];
// let intialConfidence = 0;

// module.exports.findConfidence = (data, labelsFinal) => {
  
//   data.forEach(dbImage => {
//     //empty to start a new count
//     arrayOfMatches = [];
    
//     dbImage.labels.forEach(dbLabel =>{ labelsFinal.forEach(label => {
//             if(dbLabel == label){
//                 arrayOfMatches.push(dbLabel);
//                 console.log("this is array of matches", arrayOfMatches)
//             }
//         })
//     })

//     initialConfidence =  arrayOfMatches.length;
//     confidenceArray.push(initialConfidence);
//     // console.log("THIS IS DB IMAGE" , dbImage)
//     arrayToSort.push(dbImage);  
// })

// //loop over the global
// for (let i = 0; i < arrayToSort.length; i++) {
//      const el = {...arrayToSort[i], confidence:confidenceArray[i]}; 
//      imagesWithConfidence.push(el)
//     //  console.log(`element with confidence ${el}`);
// }

// // console.log(imagesWithConfidence);
// //sort the new global
// let sortedData = imagesWithConfidence.sort((a , b) => {
//     return b.confidence - a.confidence;
// });
// // console.log(sortedData);
// // return it sorted 
//  return sortedData;
 
// }