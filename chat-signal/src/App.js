import React from "react";
import LoginPage from "./login/LoginPage";
import ChatRoom from "./ChatRoom/index.jsx";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    // Add css styling like below
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/chatroom" component={ChatRoom} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
