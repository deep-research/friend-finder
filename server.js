var express = require("express")
var bodyParser = require("body-parser");

// Initialize express
var app = express();

// Choose a port number
var PORT = process.env.PORT || 3000;

// Intitialize body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Send the app variable as an argument to module.explorts in the routing files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});