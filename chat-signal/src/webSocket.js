
import * as AES from "./AES.js"
const url = "wss://in6l1ijjf5.execute-api.us-west-2.amazonaws.com/Beta";
const connection = new WebSocket(url);

let messageHistory = [];
let CONNECTED = false;
let IS_FIRST_MSG = true;
let connectionId = null;

connection.onopen = () => {
  console.log("Connection Established!");
  CONNECTED = true;
  //  Right after connection is established, request this client's connection ID
  connection.send(`{"action": "requestConnectionID"}`);
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (message) => {
  if (IS_FIRST_MSG) {
    //  The first message is always this client's connection ID, save it for later use
    connectionId = message.data;
    IS_FIRST_MSG = false;
  } else {
    //  Every message will be prepended with the sender's connection ID by server
    //  The format of the message is senderID+=+ActualMessage
    let senderID = message.data.split("+=+")[0];
    let actualMessage = message.data.split("+=+")[1];

    console.log(message);
    let key = "examplekey";
    if(actualMessage != undefined) {
     let decryptedMsg = AES.AES_Decrypt(actualMessage, key);
      saveMsg(senderID, decryptedMsg);
    }
  }
};

const saveMsg = (sender, message) => {
  //  If the senderID == this client's connection ID, the message is from this client
  //  If the connection ID doesn't match, this is a external message
  let type = sender === connectionId ? "internal" : "external";
  let msg = {
    type: type,
    content: message.toString(),
  };
  //  Add this message to the messsage history
  messageHistory.push(msg);
};

//  Front end code will call this function to fetch up-to-date message history every 1 second
export const fetchMsgHistory = () => {
  return messageHistory;
};

//  Send message to the websocket. Only allow client to send after the connection is established
export const sendMsg = (message) => {
  if (CONNECTED === true) {
    connection.send(
      `{"action": "onMessage", "message": "${message.toString()}"}`
    );
  }
};

//  Close the socket connection when "end connection" is clicked
export const disconnect = () => {
  connection.close();
};
