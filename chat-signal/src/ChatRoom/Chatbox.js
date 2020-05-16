import React, { useState, useEffect } from 'react';

const MessageCell = props => (
    <div style={props.style}>
        {props.content}
    </div>
);

const MessageBox = () => {
    const [msgs, setMsgs] = useState([
        { type: 'external', content: 'Hello how are you bro?' },
        { type: 'external', content: 'what u up to' },
        { type: 'self', content: 'Hey bro' },
        { type: 'external', content: 'HIIIIIIIIIII' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'Ok gtg, bye!' },
        { type: 'self', content: 'Hello how are you bro?' },
    ])

    const Styles = {
        externalMessageStyle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',

        },
        ownMessageStyle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',

        },
    }
    return (
        <div>
            {msgs.map((msg) => (
                <MessageCell
                    style={
                        msg.type == 'external' ? Styles.externalMessageStyle : Styles.ownMessageStyle
                    }
                    content={msg.content}
                />
            ))}
        </div>
    );
}
const Chatbox = () => {

    return (
        <div style={Styles.MainContainer}>
            <div style={Styles.topContainer}>
                <div>
                    Andy Wu
                </div>
                <div>
                    End Connection
                </div>
            </div>
            <div>
                <MessageBox />
            </div>

        </div>
    );
};

const Styles = {
    MainContainer: {
        backgroundColor: 'lightyellow',
        height: '100%',
        padding: '24px 12px',
    },
    topContainer: {
        backgroundColor: 'lightblue',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

export default Chatbox;