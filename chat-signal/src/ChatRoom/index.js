import React, { useState, useEffect } from 'react';
import ContactsSidebar from './ContactsSidebar';
import Chatbox from './Chatbox';

const ChatRoom = () => {


    return (
        <div style={Styles.MainContainer}>
            <div style={Styles.leftContainer}>
                <ContactsSidebar />
            </div>
            <div style={Styles.rightContainer}>
                <Chatbox />
            </div>


        </div>
    );
};

const Styles = {
    MainContainer: {
        display: 'flex',


    },
    leftContainer: {
        width: '30%',
        height: '100vh',
        backgroundColor: '#2F455C',
    },
    rightContainer: {
        width: '70%',
        height: '100vh',
        backgroundColor: 'lightpurple',

    }
}

export default ChatRoom;