const sqlite3 = require("sqlite3").verbose();

// connnect to tb
const db = new sqlite3.Database("./database/database.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) throw err;
})