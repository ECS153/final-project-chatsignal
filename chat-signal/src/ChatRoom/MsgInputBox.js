import React, { useState, useEffect } from "react";
import { Input } from 'antd';

const { TextArea } = Input;

const MsgInputBox = (props) => {

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
};

const Styles = {
    mainContainer: {
        padding: 10,
        marginTop: 0,
    },
    textAreaStyle: {
        width: '100%',
        fontSize: 20,
        fontFamily: "Karla",
        padding: '8px 12px'
    },
}

export default MsgInputBox;