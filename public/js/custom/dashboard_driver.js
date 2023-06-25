const socket = io();

navigator.geolocation.getCurrentPosition(position => {
    socket.emit("online-driver", {
        driverId: Obj.driverId,
        full_name: Obj.full_name,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    })
})

let map = L.map('map').setView([30.35937, -9.52816], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let requestsContainer = document.getElementById("requests");

socket.on("taxi-request", (data) => {
    console.log(data)
    requestsContainer.innerHTML += `
    
            <img onclick="displayPosition(${data.emitter.latitude},${data.emitter.longitude})" src="" alt="df">
            fullName : ${data.emitter.full_name}
            price : ${data.content.price}
            departure : ${data.content.departure}
            arrival : ${data.content.arrival}

            <button onclick="requestStatus('${data.emitter.socketId}','Accepted')">Accept</button>
            <button onclick="requestStatus('${data.emitter.socketId}','Canceled')">Cancel</button>

    `;
})

function requestStatus(socketId,status){
    socket.emit("request-status",{socketId,status});
}

function displayPosition(lat,long){
    L.marker([lat, long], {
        title: "Here I am",
    }).addTo(map)
}