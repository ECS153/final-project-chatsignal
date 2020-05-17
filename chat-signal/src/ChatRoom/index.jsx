import React, { useState, useEffect } from "react";
import ContactsSidebar from "./ContactsSidebar";
import Chatbox from "./Chatbox";

const ChatRoom = () => {
  return (
    <div style={Styles.MainContainer}>
      <div style={Styles.leftContainer}>
        <ContactsSidebar />
      </div>
      <div style={Styles.rightContainer}>
        <Chatbox />
      </div>
    </div>
  );
};

const Styles = {
  MainContainer: {
    display: "flex",
    margin: 0,
    padding: 0,
  },
  leftContainer: {
    width: "30%",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#2F455C",
  },
  rightContainer: {
    width: "70%",
    height: "100vh",
  },
};

export default ChatRoom;
