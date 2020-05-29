import React, { Component } from "react";
import ContactCell from "./ContactCell.jsx";

class ContactsSidebar extends Component {
  state = { contacts: [...this.props.contacts] };
  render() {
    return (
      <React.Fragment style={Styles.mainContainer}>
        <div style={Styles.contactStyle}>
          <div style={Styles.blubStyle}>{this.props.userID[0]}</div>
          <div style={Styles.infoStyle}>
            <div style={Styles.userNameStyle}>{this.props.userID}</div>
            <div style={Styles.userStatusStyle}>Online</div>
          </div>
        </div>

        <div style={Styles.btnBarStyle}>
          <div style={Styles.actualBtnStyle}>CONTACTS</div>
        </div>

        {this.state.contacts.map((cell, index) => (
          <ContactCell
            initial={cell.initial}
            name={cell.name}
            status={cell.status}
            index={index}
            updateChatter={this.props.updateChatter}
            shouldDisableSelection={false}
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
  },

  btnBarStyle: {
    display: "flex",
    alignItems: "flex-start",
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  actualBtnStyle: {
    flexGrow: 1,
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
};
export default ContactsSidebar;
