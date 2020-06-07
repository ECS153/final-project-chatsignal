# final-project-chatsignal

### Build and run chatsignal locally
To run the project locally, go into ./final-project-chatsignal/chat-signal and run the command 
`npm run build` to make a new production build. <br/>
After the build is complete, a "build" folder will appear. Move that folder to ./final-project-chatsignal/chat-signal/public and replace the old build. <br/>
Go into the public directory and use the command
`npm start` to start the project locally. The default port is `localhost:3000`.<br/>
First time user should register and login to chatsignal. You can open up two localhosts to test out the chat functionality.

### Project structure

```
.
chat-signal
│   
│   App.js
│   index.js
│   serviceWorker.js
│   webSocket.js
│   package-lock.json
│   package.json
|
└───Documentation
│   │   AWS and React Documentation.txt
│   │   Chat Signal Chatroom mockup.png
│   
└───node-modules
│   │   ...(dependencies)
│
└───public
│   │   index.html
│   │   manifest.json
│   │
│   └───build
│       │   ...(production build)
│   
└───src
    │   index.html
    │   manifest.json
    │
    └───AWS
    │   │   fetchUserInfo.js
    │   │   HandleMessage.js
    │   │   onConnect.js
    │   │   onDisconnect.js
    │   │   patch.js
    │
    └───Login
    │   │   email.jsx
    │   │   EmailPage.jsx
    │   │   index.jsx
    │   │   login.jsx
    │   │   LoginPage.jsx
    │   │   LoginPage.scss
    │   │   register.jsx
    │   │   style.scss
    │
    └───Chatroom
    │   │   Chatbox.jsx
    │   │   ContactsCell.jsx
    │   │   ContactsSidebar.jsx
    │   │   index.jsx
    │   │   MsgInputBox.jsx
    │
    └───Encryption
        │   AES.js
        │   Df.js
```


## AWS







## Login








## Chatroom









## Encryption









## WebSocket

`connection.onopen()` Upon connection establish, the webSocket will immediately send a request to the AWS API to get this client's conneciton id. The route is "requestConnectionIDCopy."<br />

`connection.onmessage` Upon recieving message from other clients, there are four possible cases. Note that the raw message is a string that's delimited by "+=+" characters.<br />

1. Connection ID:
    If the incoming message is of type ID, the raw message would be <br />
    `<messageType>+=+<connectionID>` <br />
    Where after recieving this connection ID, the webSocket will request a establish key action to ...?<br />

2. Text message: 
    If the incoming message is of type text message, the raw message would be <br />
    `<messageType>+=+<senderConnectionID>+=+<actualMessage>`<br />
    Where the senderConnectionID will help determine if the message is coming from other user or simply an echo of the message that this client sent. The actual message then is parsed and decryted and saved.<br />

3. Key Generation:

4. Key Exchange:

`saveMsg()` The function will be called when the webSocket recieved a text message. The message will be formatted into javascript object with two properties: type and content. The type could be either external or internal. The content will be the actual message that other clients snet. <br />
Note that in current implementation these message willbe pushed into a global array in client's local memory. Thus the message history will be discarded if the user disconnect.

`fetchMsgHistory()` This function will be called by front end code, in particularly `Chatbox`, to retrieve the messages from websocket for display. This function simply return the most up-to-date message history array. <br />

`sendMsg()` This function will be called by front end code, inparticularly `MsgInputBox` to send the message to AWS API. The route will be "onMessageCopy" and the additional property will be the actual message.








