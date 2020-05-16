import React, { Component } from "react";

class ContactCell extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <div style={Styles.blubStyle}>{this.props.initial}</div>
        <div style={Styles.infoStyle}>
          <div style={Styles.contactNameStyle}>{this.props.name}</div>
          <div style={Styles.contactStatusStyle}>{this.props.status}</div>
        </div>
      </div>
    );
  }
}

class ContactsSidebar extends Component {
  state = {
    contacts: [
      { initial: "A", name: "Andy Wu", status: "User is typing..." },
      { initial: "C", name: "Corbin Harell", status: "1 New Message" },
      { initial: "J", name: "Jason Lin", status: "User is typing..." },
    ],
  };
  render() {
    return (
      <React.Fragment style={Styles.mainContainer}>
        <ContactCell
          style={Styles.contactStyle}
          initial="D"
          name="David Guo"
          status="online"
        />

        <div style={Styles.btnStyle}>
          <div>CONTACTS</div>
          <div> | </div>
          <div>NEW CHAT</div>
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
    height: '100%',
  },
  contactStyle: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "#2F455C",
    fontSize: 25,
    color: "#8488A",
    margin: 3,
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blubStyle: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
    width: 50,
    height: 50,
    maxWidth: 50,

    fontSize: 25,
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
    color: "#B2B2B2",
    backgroundColor: "#257869",
  },
  contactNameStyle: {
    display: "flex",
    fontSize: 20,
    margin: 1,
    color: "#B2B2B2",
  },
  contactStatusStyle: {
    display: "flex",
    fontSize: 17,
    margin: 1,
    color: "green",
  },
};
export default ContactsSidebar;
