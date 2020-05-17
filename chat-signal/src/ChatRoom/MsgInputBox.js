import React, { useState, useEffect } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const MsgInputBox = (props) => {

  return (
    <div style={Styles.mainContainer}>
      <TextArea
        placeholder="Type a message..."
        autoSize={{ minRows: 6, maxRows: 6 }}

        style={Styles.textAreaStyle}
      />
    </div>
  );
};

const Styles = {
  mainContainer: {
    padding: "0 20px",
    marginTop: 10,
  },
  textAreaStyle: {
    width: "100%",
    fontSize: 24,
    fontFamily: "Karla",
    padding: "15px 12px",

    borderStyle: "hidden",
    borderTopStyle: "solid",
    borderTopWidth: 2,
    borderColor: "gray",
  },
};

export default MsgInputBox;
