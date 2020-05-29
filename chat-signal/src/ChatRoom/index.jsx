import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactsSidebar from "./ContactsSidebar.jsx";
import Chatbox from "./Chatbox.jsx";

const ChatRoom = props => {
  const location = useLocation();
  const [contacts, setContacts] = useState([
    { initial: "E", name: "ECS 153 - SQ20", status: "" }
  ]);
  // default to chatting with first person on contact list
  const [selectedChatterIndex, setSelectedChatterIndex] = useState(0);


  const onContactPressed = (selected) => {
    console.log(
      `Updating chatter from index ${selectedChatterIndex} to ${selected}...`
    );
    setSelectedChatterIndex(selected);
  };


  return (
    <div style={Styles.MainContainer}>
      <div style={Styles.leftContainer}>
        <ContactsSidebar userID={location.state.userID} contacts={contacts} updateChatter={onContactPressed} />
      </div>
      <div style={Styles.rightContainer}>
        <Chatbox chatter={contacts[selectedChatterIndex]} />
      </div>
    </div>
  );
};

const Styles = {
  MainContainer: {
    display: "flex",
    margin: 0,
    padding: 0,
    height: '100vh'
  },
  leftContainer: {
    width: "30%",
    padding: "20px",
    backgroundColor: "#2F455C",
  },
  rightContainer: {
    width: "70%",
  },
};

export default ChatRoom;
