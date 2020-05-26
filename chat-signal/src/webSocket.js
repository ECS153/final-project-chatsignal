const url = "wss://in6l1ijjf5.execute-api.us-west-2.amazonaws.com/Beta";
const connection = new WebSocket(url);

connection.onopen = () => {
  console.log("Connection Established!");
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  console.log("DATA" + e.data);
};

export const sendMsg = (message) => {
  connection.send(
    `{"action": "onMessage", "message": "${message.toString()}"}`
  );
};

export const handleChange = (event, message) => {
  console.log(event.target.value);
  message = event.target.value;
  return message;
};
