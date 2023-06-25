const socket = io();

navigator.geolocation.getCurrentPosition(position => {
    socket.emit("online-driver", {
        driverId : Obj.driverId,
        full_name: Obj.full_name,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    })
})

let map = L.map('map').setView([30.35937, -9.52816], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


socket.on("taxi-request",(data)=>{
    console.log(data);
})