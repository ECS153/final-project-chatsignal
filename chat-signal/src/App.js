import React, { useState, useRef } from "react";
import LoginPage from "./login/LoginPage";
import ChatRoom from "./ChatRoom/index.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { sendMsg, handleChange } from "./webSocket";

let message = "We've made it";

function App() {
  // const [message, setMsg] = useState(0);

  // function handleChange(event) {
  //   setMsg(event.target.value);
  // }

  return (
    // Add css styling like below
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/chatroom" component={ChatRoom} />
        <Route component={LoginPage} />
      </Switch>
      {/* <input
        type="text"
        placeholder="Enter Message"
        onChange={handleChange}
      ></input>
      <button onClick={() => sendMsg(message)}>SEND MSG TEST BTN</button> */}
    </div>
  );
}

export default App;
