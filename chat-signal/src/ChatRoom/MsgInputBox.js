import React, { useState, useEffect } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const MsgInputBox = (props) => {
<<<<<<< HEAD

    return (
        <div style={Styles.mainContainer}>
            <TextArea
                placeholder="Type a message..."
                autoSize={{ minRows: 6, maxRows: 6 }}

                style={Styles.textAreaStyle}
            />
        </div>
    );
=======
  return (
    <div style={Styles.mainContainer}>
      <TextArea
        placeholder="Type a message..."
        autoSize={{ minRows: 6, maxRows: 6 }}
        maxLength={1000}
        style={Styles.textAreaStyle}
      />
    </div>
  );
>>>>>>> 3b37700f4827477791a50f0028c90f37305319e8
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
