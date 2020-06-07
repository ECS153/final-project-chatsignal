/* global BigInt */
import * as AES from "./Encryption/AES.js"
import Df from "./Encryption/Df.js"
const url = "wss://in6l1ijjf5.execute-api.us-west-2.amazonaws.com/KeyExchangeBeta";
const connection = new WebSocket(url);

let messageHistory = [];
let CONNECTED = false;
let IS_FIRST_MSG = true;
let KEY_INIT = false;
let connectionId = null;
let key = null;
let userSecret = new Df();
let tempKey = null;

connection.onopen = () => {
  console.log("Connection Established!");
  CONNECTED = true;
  //  Right after connection is established, request this client's connection ID
  connection.send(`{"action": "requestConnectionIDCopy"}`);
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (message) => {
  let messageData = message.data;
  console.log(messageData);
  let messageType = messageData.split("+=+")[0];
  let senderID = messageData.split("+=+")[1];
  console.log("MessageType:" + messageType);
  console.log("SenderID: " + senderID);
  if (messageType.localeCompare("txtMsg") === 0) {
    let actualMessage = messageData.split("+=+")[3];
    let senderName = messageData.split("+=+")[2];
    console.log("Recieved Encrypted Message: " +actualMessage);
    if(actualMessage != undefined && userSecret.getKey() != null) {
    let decryptedMsg = AES.AES_Decrypt(actualMessage, userSecret.getKey());
      saveMsg(senderID, senderName, decryptedMsg);
    }
  } else if (messageType.localeCompare("id") === 0) {
    connectionId = messageData.split("+=+")[1];
    console.log("Id Recieved: " + connectionId);
    //Once connected, establish a new key
    connection.send(`{"action": "establishKey"}`);
  } else if (messageType.localeCompare("keyGen") === 0) { // only generate on your request
    //set new userSecret settings
    console.log(messageData);
    let prime = "0x" + messageData.split("+=+")[2];
    let gen =  "0x" + messageData.split("+=+")[3];
    let n = messageData.split("+=+")[4];
    userSecret.setP(BigInt(prime));
    userSecret.setG(BigInt(gen));
    userSecret.setRounds(n);
    userSecret.resetSecret();
    let publicKey = userSecret.compute();
    let keyString = publicKey.toString(16);
    connection.send(`{"action": "keyExchange","publicKey": "${keyString}","n":"${n}"}`);
  } else if (messageType.localeCompare("keyExchange") === 0
            && senderID.localeCompare(connectionId) !== 0) { // prevent computing on their own public key
    userSecret.setRounds(messageData.split("+=+")[3]);
    let nextRound = userSecret.getRounds().toString();
    let newPub = "0x" + messageData.split("+=+")[2]; // set as hex
    console.log(userSecret.computeSecret(newPub));
    if(userSecret.getRounds() > 1) {
      let keyString = userSecret.getKey().toString(16);
      connection.send(`{"action": "keyExchange","publicKey": "${keyString}","n":"${nextRound}"}`);
    }
  }
};

const saveMsg = (sender,userName, message) => {
  //  If the senderID == this client's connection ID, the message is from this client
  //  If the connection ID doesn't match, this is a external message
  console.log("Sender: " + userName);
  let type = sender === connectionId ? "internal" : "external";
  let msg = {
    type: type,
    content: message.toString(),
    user: userName
  };
  //  Add this message to the messsage history
  messageHistory.push(msg);
};

//  Front end code will call this function to fetch up-to-date message history every 1 second
export const fetchMsgHistory = () => {
  return messageHistory;
};

export const fetchKey = () => {
  return userSecret.getKey();
}

//  Send message to the websocket. Only allow client to send after the connection is established
export const sendMsg = (userID, message) => {
  if (CONNECTED === true) {
    console.log("test");
    connection.send(
      `{"action": "onMessageCopy", "userID": "${userID.toString()}", "message": "${message.toString()}"}`
    );
  }
};


//  Close the socket connection when "end connection" is clicked
export const disconnect = () => {
  connection.close();
};
