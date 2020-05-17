import React, { Component } from "react";
import ContactCell from './ContactCell';

class ContactsSidebar extends Component {
  state = {
    contacts: [...this.props.contacts],
  };
  render() {
    return (
      <React.Fragment style={Styles.mainContainer}>
        <div style={Styles.contactStyle}>
          <div style={Styles.blubStyle}>D</div>
          <div style={Styles.infoStyle}>
            <div style={Styles.userNameStyle}>David Guo</div>
            <div style={Styles.userStatusStyle}>Online</div>
          </div>
        </div>

        <div style={Styles.btnBarStyle}>
          <div style={Styles.actualBtnStyle}>CONTACTS</div>
          <div
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              fontSize: 28,
              color: "#B2B2B2",
            }}
          >
            |
          </div>
          <div style={Styles.actualBtnStyle}>NEW CHAT</div>
        </div>

        {this.state.contacts.map((cell) => (
          <ContactCell
            style={Styles.contactStyle}
            initial={cell.initial}
            name={cell.name}
            status={cell.status}
          />
        ))}
      </React.Fragment>
    );
  }
}

const Styles = {
  mainContainer: {
    height: "100%",
  },

  contactStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    paddingTop: 5,
    paddingBottom: 5,
    // backgroundColor: "pink",
  },

  btnBarStyle: {
    display: "flex",
    justifyContent: "space-between",
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  actualBtnStyle: {
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 28,

    color: "#B2B2B2",
    // backgroundColor: "blue",
  },

  blubStyle: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    maxWidth: 65,

    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 35,
    backgroundColor: "white",
    color: "#B2B2B2",
    borderRadius: 1000,
    margin: 10,
  },

  infoStyle: {
    display: "flex",
    flexGrow: 12,
    flexDirection: "column",

    margin: 10,
    padding: 10,
    color: "#B2B2B2",
    // backgroundColor: "pink",
  },

  userNameStyle: {
    display: "flex",
    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 35,
    margin: 1,
    color: "#B2B2B2",
  },

  userStatusStyle: {
    display: "flex",
    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 20,
    margin: 1,
    color: "green",
  },

  contactNameStyle: {
    display: "flex",
    fontFamily: "Karla",
    fontWeight: 700,
    fontSize: 20,
    margin: 1,
    color: "#B2B2B2",
  },

  contactStatusStyle: {
    display: "flex",
    fontFamily: "Karla",
    fontWeight: 400,
    fontSize: 26,
    margin: 1,
    color: "green",
  },
};
export default ContactsSidebar;
