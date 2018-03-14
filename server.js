'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose =require("mongoose");


var app = express();


var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuration DB ===============================================================
var configDB = require('./Config/database');
mongoose.connect(configDB.url, { useMongoClient: true }, function (err) {
    if (err) {
        console.log(err.message);
    }
}); // connect to our database

//Routes ==============================================================
var routes= require("./App/Routes");
routes.assignRoutes(app);

app.listen(port);
app.get("/",function (req, res) {
    res.send("Hola");
})
io.on("connection", function (socket) {
    console.log("Hola desde socketIO ");
    socket.emit("saludo","HOLA DESDE server")
})

/*.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
