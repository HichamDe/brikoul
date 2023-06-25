const sqlite3 = require('sqlite3').verbose();

class RequestTaxi {
  constructor(clientId, departure, arrival, time, numberOfPassengers, price,id=null) {
    this.id = id,
    this.clientId = clientId;
    this.departure = departure;
    this.arrival = arrival;
    this.time = time;
    this.numberOfPassengers = numberOfPassengers;
    this.price = price;
  }

  add() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert request data into the 'requests' table
    const sql = `INSERT INTO request (clientId, departure, arrival, time, numberOfPassengers, price) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      this.clientId,
      this.departure,
      this.arrival,
      this.time,
      this.numberOfPassengers,
      this.price
    ];

    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error inserting request:', err.message);
      } else {
        console.log('Request inserted successfully!');
      }
    });

    db.close();
  }

  update() {
    const db = new sqlite3.Database('database/database.db'); 

    // Update request data in the 'requests' table
    const sql = `UPDATE request SET departure = ?, arrival = ?, time = ?, numberOfPassengers = ?, price = ? WHERE clientName = ?`;
    const values = [
      this.departure,
      this.arrival,
      this.time,
      this.numberOfPassengers,
      this.price,
      this.clientName
    ];

    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error updating request:', err.message);
      } else {
        console.log('Request updated successfully!');
      }
    });

    db.close();
  }

  delete() {
    const db = new sqlite3.Database('database/database.db'); 

    // Delete request data from the 'requests' table
    const sql = `DELETE FROM request WHERE clientName = ?`;
    const value = this.clientName;

    db.run(sql, value, function(err) {
      if (err) {
        console.error('Error deleting request:', err.message);
      } else {
        console.log('Request deleted successfully!');
      }
    });

    db.close();
  }
}

let request = new RequestTaxi(0,"sdf","sdf","sdf",15,200);
request.add()