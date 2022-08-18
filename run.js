const express = require("express"); //express library ka content express constant me daldo
const socket = require("socket.io"); //socket.io library ka content socket constant me daldo
const http = require('http');
const app = express(); //initialized and server ready

app.use(express.static("front"));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });
  
let port = 3000; // end point for to and fro movement of dataflow
let server = app.listen(port, () => {
  console.log("Listning to port " + port);
});
let io = socket(server); //connection establishment between frontend socket and server
io.on('connection', (socket) => {
    console.log("Connection Established");

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });





