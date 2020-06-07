import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import MsgInputBox from "./MsgInputBox.jsx";
import { fetchMsgHistory, disconnect } from "../webSocket";

const MessageCell = (props) => (
  <div style={props.style}>
    <div style = {props.nameStyle}>
      {props.user}
    </div>
    <div style={Styles.messageCellContainer}>
      {/* {props.showAvatar ? (
        <div style={Styles.blubStyle}>{props.chatter.initial}</div>
      ) : null} */}
      {props.content}
    </div>
  </div>
);

class MsgHistoryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgHistory: [],
      count: 0,
      delay: 1000,
      lastMsg: null
    };

  }

  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.delay);
  }

  //  Every 1 second, fetch the up-to-date message history and increment the counter
  tick = () => {
    this.setState({
      count: this.state.count + 1,
      msgHistory: fetchMsgHistory(),
    });
  };

  render() {
    return (
      <div style={Styles.ChatboxContainer}>
        {this.state.msgHistory.map((msg,i,arr) => (
          <MessageCell
            style={
              msg.type === "external"
                ? Styles.externalMessageStyle
                : Styles.ownMessageStyle
            }
            nameStyle={
              (msg.type === "external" && (i === 0 || arr[i-1].user != msg.user))
                ? Styles.useNameOther
                : Styles.useNameOwn
            }
            content={msg.content}
            user = {msg.user}
            chatter={this.props.chatter}
            showAvatar={msg.type === "external" ? true : false}
          />
        ))}
      </div>
    );
  }
}

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
          onClick={disconnect}
          style={Styles.endConnectionButtonStyle}
        >
          End Connection
        </Button>
      </div>
      <div>
        <MsgHistoryBox chatter={props.chatter} />
      </div>
      <div>
        <MsgInputBox userID={props.userID} />
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
    borderRadius: 6,
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
    borderRadius: "25px",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  externalMessageStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "2px 0",
    fontFamily: "Karla",
    fontWeight: 400,
  },
  useNameOwn: {
    display: "none",
  },
  useNameOther: {
    fontFamily: "Karla",
    fontWeight: 400,
  },
  ownMessageStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: "2px 0",
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

// console.log(forwardMsg());
// const [msgs, setMsgs] = useState([
// { type: "external", content: "Hello how are you bro?" },
// { type: "external", content: "what u up to" },
// { type: "self", content: "Hey bro" },
// { type: "external", content: "HIIIIIIIIIII" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "This is a filler message" },
// { type: "self", content: "This is a filler message" },
// { type: "external", content: "Ok gtg, bye!" },
// { type: "self", content: "Ok Ill talk to you later" },
// ]);
