import React from "react";
import LoginPage from "./login/LoginPage";
import ChatRoom from "./ChatRoom/index.jsx";
import { Route, Switch } from "react-router-dom";
import EmailPage from "./login/EmailPage";
function App() {
  return (
    // Add css styling like below
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/emailpage" component={EmailPage}/>
        <Route component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
