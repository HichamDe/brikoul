const sqlite3 = require('sqlite3').verbose();

class DataBase {

    clientExist(email, psw) {

        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('database/database.db');

            db.get('SELECT * FROM client WHERE email = ? AND psw = ?', [email, psw], function (error, row) {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }

                db.close();
            });
        });
    }
    driverExist(email, psw) {

        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('database/database.db');

            db.get('SELECT * FROM driver WHERE email = ? AND psw = ?', [email, psw], function (error, row) {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }

                db.close();
            });
        });
    }
}


module.exports = { DataBase };