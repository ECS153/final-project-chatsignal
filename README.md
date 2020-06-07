# final-project-chatsignal

### Build and run chatsignal locally
To run the project locally, go into ./final-project-chatsignal/chat-signal and run the command 
`npm run build` to make a new production build. <br/>
After the build is complete, a "build" folder will appear. Move that folder to ./final-project-chatsignal/chat-signal/public and replace the old build. <br/>
Go into the public directory and use the command
`npm start` to start the project locally. The default port is localhost:3000.<br/>

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
