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
    getId(){
        return this.id;
    }
    getPublicKey(){
        return this.publicKey;
    }

}
console.log("GG!");
var cantUsers=0;
var firstUser;
var users=new Array();
app.get("/",function (req, res) {
    res.send("Hola");
})
io.on("connection",  (socket)=> {
    console.log("new connection ");
    ++cantUsers;
    console.log("users:"+cantUsers);
    io.sockets.emit("newUser",cantUsers) // enviar a todos
    //socket.broadcast.emit("newUser",{cantUsers}); // enviar cantidad de usuarios

    socket.on("infoNewUser",(data)=>{
        //data: {"id":$socket.id,"publicKey":$myKeyPublic}
          
        
        console.log(data.id);

        if(cantUsers<=2){
            if(cantUsers==1){
                users.push(data);
            }
            else{// enviar el primer user
                socket.emit("infoNewUser",users[0]);//envar  rpimer user
                socket.broadcast.emit("infoNewUser",data);
                users.push(data)     
            }
        }
        else{
            
            socket.broadcast.emit("infoNewUser",data);
            for (var i=0;i<users.length;i++){
                socket.emit("infoNewUser",users[i]);// uno pr uno
            }
            //socket.emit("infoNewUser",users);// enviando lista
            users.push(data) 
        }
        // solo para el primer user
        /*if(cantUsers<=2){
            if(cantUsers==1){
                firstUser = data;
            }
            else{// enviar el primer user
                socket.emit("infoNewUser",firstUser)// rpimer user
                socket.broadcast.emit("infoNewUser",data);     
            }
        }
        else{socket.broadcast.emit("infoNewUser",data);}*/

             
    });
   socket.on("newMessage",(data)=>{
       console.log("message to "+data.to)
       socket.broadcast.to(data.to).emit('newMessage', data.message);
   });
   socket.on("disconnect",()=>{
        --cantUsers;
         var a =users.findIndex(x=> x.id===socket.id);
        
        console.log("disconect: "+socket.id)
        //console.log("delete "+a+" -> "+users[a].id);
        users.splice(a,1);
        console.log("users: "+users.length);
        socket.broadcast.emit("disconected",socket.id)
        //socket.emit("getUsers",cantUsers);
   });

})

/*var buscarReceptor = function (id){
    if (users[0].getId==id){
        return users[0].getPublicKey;
    }
    else{
        return users[1].getPublicKey;
    }
}*/


/*.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
