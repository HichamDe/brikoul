const path = require("path");
const index = path.join(__dirname,"../public/pages/index.html");
const dashboard_driver = path.join(__dirname,"../public/pages/dashboard_driver.html");
const dashboard_client = path.join(__dirname,"../public/pages/dashboard_client.html");


module.exports = { dashboard_client, dashboard_driver , index};