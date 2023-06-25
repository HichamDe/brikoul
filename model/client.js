const sqlite3 = require('sqlite3').verbose();

class Client {
  constructor(full_name, email, phone) {
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
  }

  add() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert client data into the 'clients' table
    const sql = `INSERT INTO client (full_name,  phone ,email) VALUES (?, ?, ?)`;
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
const client = new Client('aya alaoui', '0621456587','aya.alaoui@gmail.com');
client.add();
