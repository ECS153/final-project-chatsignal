import React from "react";
import {Email} from "./index";
import "./LoginPage.scss";

class EmailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false
    };
  }



  render() {
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {
              <Email containerRef={ref => (this.current = ref)} />
            }
           
          </div>
        </div>
      </div>
    );
  }
}
export default EmailPage;
