import React, { useState, useEffect } from 'react';

const MessageCell = props => (
    <div style={props.style}>
        <div style={{
            backgroundColor: '#2F455C',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 14,
            fontSize: 24,
        }}>
            {props.content}
        </div>
    </div>
);

const MessageBox = () => {
    const [msgs, setMsgs] = useState([
        { type: 'external', content: 'Hello how are you bro?' },
        { type: 'external', content: 'what u up to' },
        { type: 'self', content: 'Hey bro' },
        { type: 'external', content: 'HIIIIIIIIIII' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'This is a filler message' },
        { type: 'self', content: 'This is a filler message' },
        { type: 'external', content: 'Ok gtg, bye!' },
        { type: 'self', content: 'Ok Ill talk to you later' },
    ])

    const Styles = {
        externalMessageStyle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: '12px 0'
        },
        ownMessageStyle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: '12px 0'
        },
        ChatboxContainer: {
            height: '70vh',
            overflowY: 'scroll',
        }
    }
    return (
        <div style={Styles.ChatboxContainer}>
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
    const [receiverName, setReceiverName] = useState('Andy Wu');

    return (
        <div style={Styles.MainContainer}>
            <div style={Styles.topContainer}>
                <div style={Styles.nameWrapperStyle}>
                    {receiverName}
                </div>
                <div style={Styles.endConnectionButtonStyle}>
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
        // backgroundColor: 'lightyellow',
        height: '100%',
        padding: '24px 12px',
    },
    topContainer: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
    },
    nameWrapperStyle: {
        fontSize: 40,
        color: 'gray'
    },
    endConnectionButtonStyle: {
        fontSize: 32,
        color: 'red',
    }
}

export default Chatbox;