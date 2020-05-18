import React, { useState, useEffect } from "react";

import MsgInputBox from "./MsgInputBox.jsx";
import ContactCell from "./ContactCell.jsx";
import "antd/dist/antd.css";
import { Button } from "antd";

const MessageCell = (props) => (
  <div style={props.style}>
    <div style={Styles.messageCellContainer}>
      {props.showAvatar ? (
        <div style={Styles.blubStyle}>{props.chatter.initial}</div>
      ) : null}
      {props.content}
    </div>
  </div>
);

const MsgHistoryBox = (props) => {
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
          chatter={props.chatter}
          showAvatar={msg.type == "external" ? true : false}
        />
      ))}
    </div>
  );
};

const Chatbox = (props) => {
  console.log(props.chatter); // chatter is the person you currently selected to chat with
  return (
    <div style={Styles.MainContainer}>
      <div style={Styles.topContainer}>
        <div style={Styles.nameWrapperStyle}>{props.chatter.name}</div>
        <Button
          danger
          type="primary"
          size="large"
          style={Styles.endConnectionButtonStyle}
        >
          End Connection
        </Button>
      </div>
      <div>
        <MsgHistoryBox chatter={props.chatter} />
      </div>
      <div>
        <MsgInputBox />
      </div>
    </div>
  );
};

const Styles = {
  MainContainer: {
    height: "100%",
    padding: "0px 15px 15px",
  },
  topContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0px 15px 10px -15px gray",
    marginBottom: 12,
  },
  nameWrapperStyle: {
    fontSize: 35,
    color: "gray",
    fontFamily: "Karla",
    fontWeight: 400,
  },
  endConnectionButtonStyle: {
    fontFamily: "Karla",
    borderRadius: 6
  },
  blubStyle: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    maxWidth: 50,
    maxHeight: 50,
    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 24,
    backgroundColor: "white",
    color: "#B2B2B2",
    borderRadius: 1000,
    margin: "8px 14px 8px 0",
  },
  messageCellContainer: {
    backgroundColor: "#3C5B7C",
    color: "white",
    padding: "12px 20px",
    borderRadius: 25,
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
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

export default Chatbox;
