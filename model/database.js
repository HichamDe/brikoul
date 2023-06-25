const sqlite3 = require('sqlite3').verbose();

class DataBase {
    constructor(){
        this.db = new sqlite3.Database('database/database.db'); 
    }

    clientExist(email){
        const sql = `SELECT * FROM client WHERE email=?`;
        this.db.run(sql, [email] , function(err) {
          if (err) throw err;
          else {
            return sql.length;
          }
        });
        this.db.close()
    }
    driverExist(){
        
    }

}

let db = new DataBase().clientExist("hmad.obihi@gmail.com");
console.log(db)