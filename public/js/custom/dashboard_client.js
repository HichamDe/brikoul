const socket = io();

navigator.geolocation.getCurrentPosition(position => {
    socket.emit("online-client", {
        clientId : Obj.clientId,
        full_name: Obj.full_name,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    })
})

let map = L.map('map').setView([30.35937, -9.52816], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

socket.on("all-working-drivers", (drivers) => {
    drivers.forEach(driver => {
        L.marker([driver.latitude, driver.longitude], {
            title: driver.full_name,
        }).addTo(map)
            .bindPopup(`
            <div class="popup">
                <h2>Request Taxi</h2>
                <form id="requestForm" onsubmit="return false;">
                    <div class="form-group">
                        <label for="departure">Departure:</label>
                        <input type="text" id="departure" name="departure" required>
                    </div>
                    <div class="form-group">
                        <label for="arrival">Arrival:</label>
                        <input type="text" id="arrival" name="arrival" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Time:</label>
                        <input type="text" id="time" name="time" required>
                    </div>
                    <div class="form-group">
                        <label for="numberOfPassengers">Number of Passengers:</label>
                        <input type="number" id="numberOfPassengers" name="numberOfPassengers" required>
                    </div>
                    <div class="form-group">
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" onclick="sendRequest(${driver.driverId},'${driver.socketId}')">Submit</button>
                    </div>
                </form>
            </div>`);
    });
})

socket.on("response",(data)=>{
    alert(data);
})

function sendRequest(driverId,socketId){

    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const time = document.getElementById('time').value;
    const numberOfPassengers = parseInt(document.getElementById('numberOfPassengers').value);
    const price = parseFloat(document.getElementById('price').value);

    socket.emit("taxi-request",{
        emitter : {
            clientId : Obj.clientId,
            full_name : Obj.full_name,
        },
        receiver : {
            driverId : driverId,
            socketId : socketId
        },
        content : {
            departure,
            arrival,
            time,
            numberOfPassengers,
            price
        }
    })
}