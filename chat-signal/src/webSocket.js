import React from "react";

const url = "wss://in6l1ijjf5.execute-api.us-west-2.amazonaws.com/Beta";
const connection = new WebSocket(url);

let oneMsg = [];
let CONNECTED = false;
let FIRST_MSG = true;
let connectionId = null;

connection.onopen = (res) => {
  console.log(res);
  console.log("Connection Established!");
  CONNECTED = true;
  connection.send(`{"action": "requestConnectionID"}`);
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (message) => {
  console.log("connectionID: " + message.data);

  if (FIRST_MSG) {
    connectionId = message.data;
    FIRST_MSG = false;
  } else {
    let senderID = message.data.split("+=+")[0];
    saveMsg(senderID, message.data.split("+=+")[1]);
  }
};

const saveMsg = (sender, message) => {
  let type = sender === connectionId ? "internal" : "external";
  let msg = {
    type: type,
    content: message.toString(),
  };
  oneMsg.push(msg);
  console.log(oneMsg);
};

export const forwardMsg = () => {
  return oneMsg;
};

export const sendMsg = (message) => {
  if (CONNECTED === true) {
    connection.send(
      `{"action": "onMessage", "message": "${message.toString()}"}`
    );
  }
};

export const disconnect = () => {
  connection.close();
};
