// module.exports = function(app){
//     const cors = require ('cors')
//     const corsOptions = {
//         origin: function(origin, callback){
//             if(process.env.CORS_WHITELIST.split(' ').indexOf(origin) !== -1){
//                 callback (null, true)
//             }else{
//                 callback(new Error ("not allowed by cors config"))
//             }
//         },
//         methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//     }
//     app.options('*', cors(corsOptions))
//     app.use(cors(corsOptions))
// }