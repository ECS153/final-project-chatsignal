import React from 'react';
import './App.css';

function App() {
  return (
    // Add css styling like below
    <div style={Styles.sampleStyle1}>
      Ayyy Let's Start coding!
    </div>
  );
}

//NOTE: Add styles here (basically CSS syntax but in camel case)
const Styles = {
  sampleStyle1: {
    backgroundColor: 'lightblue',
    fontSize: 40,
    color: 'red',
  },
}

export default App;
