'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose =require("mongoose");


var app = express();






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

var server = app.listen(port);
var io = require("socket.io")(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials' , 'true');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});
app.get("/",function (req, res) {
    res.send("Hola");
})
io.on("connection",  (socket)=> {
    console.log("Hola desde socketIO ");
    socket.emit("saludo","HOLA DESDE server")
    socket.on("rpta", (data)=>{
       console.log(data);
   });
})




/*.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
