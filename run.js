const express = require("express"); //express library ka content express constant me daldo
const socket = require("socket.io"); //socket.io library ka content socket constant me daldo
const http = require('http');
const app = express(); //initialized and server ready

app.use(express.static("front"));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });
  
let port = process.env.PORT || 3000; // end point for to and fro movement of dataflow
let server = app.listen(port, () => {
  console.log("Listning to port " + port);
});
let io = socket(server); //connection establishment between frontend socket and server
io.on('connection', (socket) => {
    console.log("User connected");
// let connectons=[];
    socket.on('draw' , (data)=>{
     io.emit('onDraw' , {x:data.x , y: data.y})
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  





