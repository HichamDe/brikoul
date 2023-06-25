const express = require("express");
const logger = require("morgan");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();
const { dashboard_client, dashboard_driver, index, maps, login, requesttaxi } = require("./env/files");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Schema
const { Client } = require("./model/client");
const { RequestTaxi } = require("./model/request");
const { Driver } = require("./model/driver");
const { DataBase } = require("./model/database");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.set("view engine", "ejs");
// GET

app.get("/", (req, res) => {
    res.sendFile(index);
});
app.get("/request", (req, res) => {
    res.sendFile(requesttaxi);
});
app.get("/login", (req, res) => {
    res.sendFile(login);
});
app.get("/dashboard_client", (req, res) => {
    res.sendFile(dashboard_client);
});
app.get("/dashboard_driver", (req, res) => {
    res.sendFile(dashboard_driver);
});
app.get("/maps", (req, res) => {
    res.sendFile(maps)
})





// POST
app.post("/sign-up", (req, res) => {
    let { full_name, type, phone, email, psw } = req.body;
    if (type == "client") {
        let client = new Client(full_name, phone, email, psw);
        client.add();
    }
    else if (type == "driver") {
        let driver = new Driver(full_name, phone, email, psw);
        driver.add();
    }
    res.redirect("/login");
});


app.post("/login", (req, res) => {
    let { email, psw, type } = req.body;
    if (type == "client") {
        let db = new DataBase().clientExist(email, psw);
        db.then((result) => {
            if (result) res.render("dashboard_client", { clientId: result.id, full_name: result.full_name });
            else res.redirect("/login");
        })
    } else if (type == "driver") {
        let db = new DataBase().driverExist(email, psw);
        db.then((result) => {
            if (result) res.render("dashboard_driver", { clientId: result.id, full_name: result.full_name });
            else res.redirect("/login");
        })
    }
});





let clients = [];
let drivers = [];

io.on("connection", (socket) => {

    // online
    socket.on("online-client", (data) => {
        let { clientId, longitude, latitude } = data;
        clients.push({ socketId: socket.id, clientId, latitude, longitude });
    });

    socket.on("online-driver", (data) => {
        let { driverId, longitude, latitude } = data;
        drivers.push({ socketId: socket.id, driverId, latitude, longitude });
        // send to the clients the updates
        socket.broadcast.emit("all-working-drivers", drivers)
    });

    socket.on("taxi-request", (data) => {
        console.log(data);
        let { emitter, receiver, content } = data;
        emitter.socketId = socket.id;
        clients.forEach(client => {
            if (client.socketId === socket.id) {
                emitter = {
                    clientId: client.clientId,
                    latitude: client.latitude,
                    longitude: client.longitude,
                    socketId: socket.id
                }
            }
        })
        socket.to(receiver.socketId).emit("taxi-request", {
            content,
            emitter

        });

        let request = new RequestTaxi(
            emitter.clientId,
            content.departure,
            content.arrival,
            content.time,
            content.numberOfPassengers,
            content.price,
            receiver.driverId,
            0
        )
        request.add();

    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
// io.of("/dashboard_client").on("connection",(socket)=>{
//     console.log("user connected from client dashboard")
// })
server.listen(PORT, console.log(`Server Running at ${PORT}`));