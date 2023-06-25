const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();
const {dashboard_client,dashboard_driver,index,maps,login,requesttaxi} = require("./env/files");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(index);
});
app.get("/request",(req,res)=>{
    res.sendFile(requesttaxi);
});
app.get("/login",(req,res)=>{
    res.sendFile(login);
});
app.get("/dashboard_client",(req,res)=>{
    res.sendFile(dashboard_client);
});
app.get("/dashboard_driver",(req,res)=>{
    res.sendFile(dashboard_driver);
});
app.get("/maps",(req,res)=>{
    res.sendFile(maps)
})

let clients = [];
let drivers = [];

io.on("connection",(socket)=>{

    // online
    socket.on("online",(data)=>{
        let {id,type,longitude,latitude} = data;
        if(type=="client") clients.push({id,type,latitude,longitude});
        else if (type=="driver") drivers.push({id,type,latitude,longitude});

        // send to the clients the updates
        clients.forEach(client => {
            socket.broadcast.emit("all-working-drivers",drivers)
        });
    });
    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(PORT,console.log(`Server Running at ${PORT}`));