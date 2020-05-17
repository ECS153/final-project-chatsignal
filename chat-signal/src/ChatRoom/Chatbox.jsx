import React, { useState, useEffect } from "react";

const MessageCell = (props) => (
  <div style={props.style}>
    <div
      style={{
        backgroundColor: "#3C5B7C",
        color: "white",
        padding: "12px 20px",
        borderRadius: 25,
        fontSize: 24,
      }}
    >
      {props.content}
    </div>
  </div>
);

const MessageBox = () => {
  const [msgs, setMsgs] = useState([
    { type: "external", content: "Hello how are you bro?" },
    { type: "external", content: "what u up to" },
    { type: "self", content: "Hey bro" },
    { type: "external", content: "HIIIIIIIIIII" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "This is a filler message" },
    { type: "self", content: "This is a filler message" },
    { type: "external", content: "Ok gtg, bye!" },
    { type: "self", content: "Ok Ill talk to you later" },
  ]);

  const Styles = {
    externalMessageStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      margin: "12px 0",

      fontFamily: "Karla",
      fontWeight: 400,
    },
    ownMessageStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      margin: "12px 0",

      fontFamily: "Karla",
      fontWeight: 400,
    },
    ChatboxContainer: {
      height: "70vh",
      padding: "0 20px",
      overflowY: "scroll",
    },
  };
  return (
    <div style={Styles.ChatboxContainer}>
      {msgs.map((msg) => (
        <MessageCell
          style={
            msg.type == "external"
              ? Styles.externalMessageStyle
              : Styles.ownMessageStyle
          }
          content={msg.content}
        />
      ))}
    </div>
  );
};
const Chatbox = () => {
  const [receiverName, setReceiverName] = useState("Andy Wu");

  return (
    <div style={Styles.MainContainer}>
      <div style={Styles.topContainer}>
        <div style={Styles.nameWrapperStyle}>{receiverName}</div>
        <div style={Styles.endConnectionButtonStyle}>End Connection</div>
      </div>
      <div>
        <MessageBox />
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
  );
};

const Styles = {
  MainContainer: {
    // backgroundColor: "lightyellow",
    height: "100%",
    padding: "15px 15px",
  },
  topContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    // backgroundColor: "blue",
  },
  nameWrapperStyle: {
    fontSize: 35,
    color: "gray",

    fontFamily: "Karla",
    fontWeight: 400,
  },
  endConnectionButtonStyle: {
    fontSize: 35,
    color: "red",

    fontFamily: "Karla",
    fontWeight: 400,
  },
};

export default Chatbox;
