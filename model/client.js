const sqlite3 = require('sqlite3').verbose();

class Client {
  constructor(full_name, email, phone) {
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
  }

  addClient() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert client data into the 'clients' table
    const sql = `INSERT INTO clients (full_name, email, phone) VALUES (?, ?, ?)`;
    const values = [this.full_name, this.email, this.phone];

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
