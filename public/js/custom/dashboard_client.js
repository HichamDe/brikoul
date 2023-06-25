const socket = io();

navigator.geolocation.getCurrentPosition(position => {
    socket.emit("online-client", {
        id: 0,
        type: "client",
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
            title: "Hmad Obihi",
            // icon:myIcon
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
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>`);
    });
})

function sendRequest(driverId){

}