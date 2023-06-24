const sqlite3 = require('sqlite3').verbose();

class Client {
  constructor(name, email, phoneNumber) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  addClient() {
    const db = new sqlite3.Database('database/database.db'); // Replace 'database.db' with your SQLite3 database file name

    // Insert client data into the 'clients' table
    const sql = `INSERT INTO clients (name, email, phoneNumber) VALUES (?, ?, ?)`;
    const values = [this.name, this.email, this.phoneNumber];

    db.run(sql, values, function(err) {
      if (err) {
        console.error('Error inserting client:', err.message);
      } else {
        console.log('Client inserted successfully!');
      }
    });

    db.close();
  }
}
