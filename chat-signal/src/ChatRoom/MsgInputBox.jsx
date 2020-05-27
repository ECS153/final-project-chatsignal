import React, { useState } from "react";
import { sendMsg } from "../webSocket";

const MsgInputBox = (props) => {
  const [message, setMsg] = useState("");

  function handleChange(event) {
    setMsg(event.target.value);
  }

  return (
    <div style={Styles.mainContainer}>
      <input
        type="text"
        placeholder="Type a message..."
        onChange={handleChange}
        value={message}
        style={Styles.textAreaStyle}
      />
      <button
        onClick={() => {
          sendMsg(message);
          setMsg(" ");
        }}
        style={Styles.btnStyle}
      >
        Send
      </button>
    </div>
  );
};

const Styles = {
  mainContainer: {
    display: "flex",
    padding: "0 20px",
    marginTop: 10,
    minHeight: "100%",
  },
  textAreaStyle: {
    flexGrow: 10,
    display: "flex",
    width: "100%",
    fontSize: 24,
    fontFamily: "Karla",
    padding: "15px 12px",

    maxWidth: "100%",
    minHeight: "99%",

    overflowWeap: "break-word",
    wordWrap: "break-word",

    borderStyle: "hidden",
    borderTopStyle: "solid",
    borderTopWidth: 2,
    borderColor: "gray",
  },

  btnStyle: {
    flexGrow: 3,
    display: "flex",

    fontSize: 24,
    borderStyle: "hidden",
    borderTopStyle: "solid",
    borderTopWidth: 2,
    borderColor: "gray",
  },
};

export default MsgInputBox;
