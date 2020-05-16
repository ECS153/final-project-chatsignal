import React from 'react';
import LoginScreen from './login.js';
import ChatRoom from './ChatRoom/index.js';
function App() {
  return (
    // Add css styling like below
    <div style={Styles.sampleStyle1}>
      {/* <LoginScreen /> */}
      <ChatRoom />

    </div>

  );
}

//NOTE: Add styles here (basically CSS syntax but in camel case)
const Styles = {
  // sampleStyle1: {
  //   backgroundColor: 'lightblue',
  //   fontSize: 40,
  //   color: 'red',
  // },
}

export default App;
