const sqlite3 = require('sqlite3').verbose();

class Client {
  constructor(full_name, phone, email) {
    this.full_name = full_name;
    this.phone = phone;
    this.email = email;
  }

  add() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert client data into the 'clients' table
    const sql = `INSERT INTO client (full_name,phone ,email) VALUES (?, ?, ?)`;
    const values = [this.full_name, this.phone, this.email];

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
// Create a new client and insert into the database
const client = new Client('hmad obihi', '656587','hmad.obihi@gmail.com');
client.add();
