// let db;
// // create a new db request for a "budget" database.
// const request = indexedDB.open("designersfriend", 1);

// // Create schema
// request.onupgradeneeded = (event) => {
//   const db = event.target.result;

//   // Creates an object store with a listID keypath that can be used to query on.
//   const imageStore = db.createObjectStore("designersfriend", {
//     keyPath: "listID",
//   });
//   // Creates a statusIndex that we can query on.
//   imageStore.createIndex("statusIndex", "status");
// };

// // Opens a transaction, accesses the toDoList objectStore and statusIndex.
// request.onsuccess = () => {
//   const db = request.result;
//   console.log(db)
//   const transaction = db.transaction(["designersfriend"], "readwrite");
//   const imageStore = transaction.objectStore("designersfriend");
//   const statusIndex = imageStore.index("statusIndex");
// };
