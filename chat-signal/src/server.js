const express = require("express");

const bodyParser = require("body-parser");
const fs = require("fs");

const sql = require("sqlite3").verbose();
const FormData = require("form-data");

// begin constructing the server pipeline
const app = express();

// Serve static files out of public directory
app.use(express.static("public"));

// Handle GET request to base URL with no other route specified
// by sending creator.html, the main page of the app
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

// custom 404 page (not a very good one...)
// last item in pipeline, sends a response to any request that gets here
app.all("*", function (request, response) {
  response.status(404); // the code for "not found"
  response.send("Some Error happened...");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
