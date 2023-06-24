const sqlite3 = require('sqlite3').verbose();

class RequestTaxi {
  constructor(clientName, departure, arrival, time, numberOfPassengers, price) {
    this.clientName = clientName;
    this.departure = departure;
    this.arrival = arrival;
    this.time = time;
    this.numberOfPassengers = numberOfPassengers;
    this.price = price;
  }

  addRequest() {
    const db = new sqlite3.Database('../database/database.db'); 

    // Insert request data into the 'requests' table
    const sql = `INSERT INTO requests (clientName, departure, arrival, time, numberOfPassengers, price) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      this.clientName,
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

  updateRequest() {
    const db = new sqlite3.Database('../database/database.db'); 

    // Update request data in the 'requests' table
    const sql = `UPDATE requests SET departure = ?, arrival = ?, time = ?, numberOfPassengers = ?, price = ? WHERE clientName = ?`;
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

  deleteRequest() {
    const db = new sqlite3.Database('../database/database.db'); 

    // Delete request data from the 'requests' table
    const sql = `DELETE FROM requests WHERE clientName = ?`;
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
