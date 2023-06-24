const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();
const {dashboard_client,dashboard_driver,index,maps} = require("./env/files");

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(index);
});
app.get("/dashboard_client",(req,res)=>{
    res.sendFile(dashboard_client);
});
app.get("/dashboard_driver",(req,res)=>{
    res.sendFile(dashboard_driver);
});
app.get("/maps",(req,res)=>{
    res.sendFile(maps)
})

app.listen(PORT,console.log(`Server Running at ${PORT}`));