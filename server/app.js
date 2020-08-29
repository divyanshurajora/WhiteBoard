const express = require('express');
const app = express();
//  nodejs module
const http = require('http').createServer(app);
//  socket enbaled server
const io = require('socket.io')(http);
io.on("connection", function (socket) {
    console.log("New client connected");
    console.log(socket.id);
    socket.on("color", function (color) {
        // console.log(data);
        socket.broadcast.emit('colorchange', color);
    })
    socket.on("md", function (point) {
        socket.broadcast.emit("onmd", point);
    })
    socket.on("mm", function (point) {
        socket.broadcast.emit("onmm", point);
    })
    socket.on("hamburger", function() {
        socket.broadcast.emit("onhamburger");
    });
    // socket.on("undo", function() {
    //     socket.broadcast.emit("onundo");
    // });
    // socket.on("redo", function() {
    //     socket.broadcast.emit("onredo");
    // });
})

//  connection\
let port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("Server started at port 3000");
})