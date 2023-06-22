const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();


app.get("/",(req,res)=>{
    res.send("working server")
})

app.listen(PORT,console.log(`Server Running at ${PORT}`));