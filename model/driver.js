const sqlite3 = require('sqlite3').verbose();

class Driver {
  constructor(full_name, email, phone) {
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
  }

  addDriver() {
    const db = new sqlite3.Database('../database/database.db'); 

    // Insert driver data into the 'drivers' table
    const sql = `INSERT INTO drivers (full_name, email, phone) VALUES (?, ?, ?)`;
    const values = [this.full_name, this.email, this.phone];

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
