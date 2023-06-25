const path = require("path");
const index = path.join(__dirname,"../public/pages/index.html");
const dashboard_driver = path.join(__dirname,"../public/pages/dashboard_driver.html");
const dashboard_client = path.join(__dirname,"../public/pages/dashboard_client.html");
const login = path.join(__dirname,"../public/pages/login.html");
const maps = path.join(__dirname,"../test/dashboard_driver.html");
const requesttaxi = path.join(__dirname,"../public/pages/requesttaxi.html");


module.exports = { dashboard_client, dashboard_driver , index, maps,login,requesttaxi};