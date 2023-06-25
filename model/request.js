const sqlite3 = require('sqlite3').verbose();

class RequestTaxi {
  constructor(clientId, departure, arrival, time, numberOfPassengers, price,driverId,status,id=null) {
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
    const sql = `INSERT INTO request (clientId, departure, arrival, time, numberOfPassengers, price,driverId,status) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
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

  // update() {
  //   const db = new sqlite3.Database('database/database.db'); 

  //   // Update request data in the 'requests' table
  //   const sql = `UPDATE request SET departure = ?, arrival = ?, time = ?, numberOfPassengers = ?, price = ? WHERE clientName = ?`;
  //   const values = [
  //     this.departure,
  //     this.arrival,
  //     this.time,
  //     this.numberOfPassengers,
  //     this.price,
  //     this.clientName
  //   ];

  //   db.run(sql, values, function(err) {
  //     if (err) {
  //       console.error('Error updating request:', err.message);
  //     } else {
  //       console.log('Request updated successfully!');
  //     }
  //   });

  //   db.close();
  // }
}

// module.exports = {RequestTaxi};

let req = new RequestTaxi(1,"df","df","sdf",10,150,50,0)
req.add()