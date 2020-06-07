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
└───Documentation
|   │   AWS and React Documentation.txt
|   │   Chat Signal Chatroom mockup.png
│   
└───node-modules
|   │   ...(dependencies)
|
|   package-lock.json
│   package.json
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
    |   │   ...
    └───Login
    |   │   ...
    |   │   ...
    └───Chatroom
    |   │   ...
    |   │   ...
    └───Encryption
        │   AES.js
        │   Df.js


    

```


## AWS
## Login
## Chatroom
## Encryption