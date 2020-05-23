const express = require("express");

const bodyParser = require("body-parser");
const fs = require("fs");
const sql = require("sqlite3").verbose();

const userInfoDB = new sql.Database("UserInfo.db");

// Actual table creation; only runs if "UserInfo.db" is not found or empty
let cmd =
  " SELECT name FROM sqlite_master WHERE type='table' AND name='UserAccInfoTable' ";
userInfoDB.get(cmd, function (err, val) {
  console.log(err, val);
  if (val == undefined) {
    console.log("No database file - creating one");
    createUserInfoDB();
  } else {
    console.log("Database file found");
  }
});

function createUserInfoDB() {
  // explicitly declaring the rowIdNum protects rowids from changing if the
  // table is compacted; not an issue here, but good practice
  const cmd =
    "CREATE TABLE UserAccInfoTable (username TEXT PRIMARY KEY, email TEXT, hash TEXT, salt TEXT, location TEXT)";
  userInfoDB.run(cmd, function (err, val) {
    if (err) {
      console.log("Database creation failure", err.message);
    } else {
      console.log("Created database");
    }
  });
}

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

app.post("/signup", function (req, res) {
  console.log("-------------- Save SignUp Info -------------");
  console.log("Server Saved: " + JSON.stringify(req.body));

  let usrName = req.body.username;
  let email = req.body.eamil;
  let hash = req.body.hash;
  let salt = req.body.salt;
  let location = req.body.location;

  console.log("UserName: " + usrName);
  console.log("Email: " + email);
  console.log("Hashed Password: " + hash);
  console.log("Salt: " + salt);
  console.log("Location: " + location);
  console.log("------------ Save SignUp Info End -----------");

  let cmd =
    "INSERT INTO UserAccInfoTable (username, email, hash, salt, location) VALUES(?, ?, ?, ?, ?)";
  postCardDB.run(cmd, usrName, email, hash, salt, location, function (err) {
    if (err) {
      console.log("DB insert error", err.message);
    } else {
      res.send("Database Entry Success!");
    }
  });
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
