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

/*var configDB = require('./Config/database');
mongoose.connect(configDB.url, {
    useMongoClient:true,
    user:configDB.user,
    pass:configDB.pass},
    function (err) {
    if (err) {
        console.log("ERROR MongoDB: "+err.message);
    }
}); // connect to our database
*/
//Routes ==============================================================
/*var routes= require("./App/Routes");
routes.assignRoutes(app);
*/
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

class User{
    constructor(id,publicKey){
        this.id=id;
        this.publicKey=publicKey;
    }
    get id(){
        return this.id;
    }
    get publicKey(){
        return this.publicKey;
    }

}
console.log("GG!");
var cantUsers=0;

var users={};
app.get("/",function (req, res) {
    res.send("Hola");
})
io.on("connection",  (socket)=> {
    console.log("new connection ");
    ++cantUsers;
    console.log(cantUsers);
   socket.on("newKey",(data)=>{
       users.push(new User(socket.id,data));

       socket.emit("getUsers",cantUsers);// envia rla cantidad de usuarios
        if(cantUsers==2){
            // envar la keypublic del Receptor

            socket.emit("getpublicKey",buscarReceptor);       
        }

        
   })
   socket.on("newMessage",(data)=>{
       //  
       socket.emit("newMessage",data);

   });
   socket.on("disconnect",()=>{
        --cantUsers;
        socket.emit("getUsers",cantUsers);
   });

})

var buscarReceptor = function (id){
    if (users[0].id==id){
        return users[0].publicKey;
    }
    else{
        return users[1].publicKey;
    }
}


/*.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
