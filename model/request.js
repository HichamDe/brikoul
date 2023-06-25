const sqlite3 = require('sqlite3').verbose();

class RequestTaxi {
  constructor(id,clientId, departure, arrival, time, numberOfPassengers, price,driverId,status) {
    this.id = id,
    this.clientId = clientId;
    this.departure = departure;
    this.arrival = arrival;
    this.time = time;
    this.numberOfPassengers = numberOfPassengers;
    this.price = price;
    this.driverId = driverId;
    this.status = status;
  }

  add() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert request data into the 'requests' table
    const sql = `INSERT INTO request (id,clientId, departure, arrival, time, numberOfPassengers, price,driverId,status) VALUES (?, ?,?, ?, ?, ?, ?,?,?)`;
    const values = [
      this.id,
      this.clientId,
      this.departure,
      this.arrival,
      this.time,
      this.numberOfPassengers,
      this.price,
      this.driverId,
      this.status
    ];

    db.run(sql, values, function(err){
      if (err) {
        console.error('Error inserting request:', err.message);
      } else {
        console.log('Request inserted successfully!');
      }
    });

    db.close();
  }
}

module.exports = {RequestTaxi}