const sqlite3 = require('sqlite3').verbose();

class Driver {
  constructor(name, email, phoneNumber) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  addDriver() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert driver data into the 'drivers' table
    const sql = `INSERT INTO drivers (name, email, phoneNumber) VALUES (?, ?, ?)`;
    const values = [this.name, this.email, this.phoneNumber];

    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error inserting driver:', err.message);
      } else {
        console.log('Driver inserted successfully!');
      }
    });

    db.close();
  }
}
