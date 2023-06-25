const sqlite3 = require('sqlite3').verbose();

class Driver {
  constructor(full_name, email, phone,psw) {
    this.full_name = full_name;
    this.phone = phone;
    this.email = email;
    this.psw = psw;
  }

  add() {
    const db = new sqlite3.Database('database/database.db'); 

    // Insert driver data into the 'drivers' table
    const sql = `INSERT INTO driver (full_name,phone,email,psw) VALUES (?, ?, ?,?)`;
    const values = [this.full_name, this.phone,this.email,this.psw];

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


module.exports = {Driver};
