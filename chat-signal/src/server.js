const express = require("express");

const bodyParser = require("body-parser");
const fs = require("fs");

// const sql = require("sqlite3").verbose();
// const FormData = require("form-data");

// begin constructing the server pipeline
const app = express();

// Serve static files out of public directory
app.use(
  express.static(
    "/home/ec2-user/ChatSignal/final-project-chatsignal/chat-signal/public/build"
    // "/Users/davidguo/Documents/GitHub/final-project-chatsignal/chat-signal/public/build"
  )
);

// Handle GET request to base URL with no other route specified
// by sending creator.html, the main page of the app
app.get("/", function (request, response) {
  response.sendFile(
    "/home/ec2-user/ChatSignal/final-project-chatsignal/chat-signal/public/build/index.html"
    // "/Users/davidguo/Documents/GitHub/final-project-chatsignal/chat-signal/public/build/index.html"
  );
});

// custom 404 page (not a very good one...)
// last item in pipeline, sends a response to any request that gets here
app.all("*", function (request, response) {
  response.status(404); // the code for "not found"
  response.send("Some Error happened...");
});

// listen for requests :)
var listener = app.listen(80, function () {
  console.log("Your app is listening on port " + 80);
});
