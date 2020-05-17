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
};

const Styles = {
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
    infoStyle: {
        display: "flex",
        flexGrow: 12,
        flexDirection: "column",

        margin: 10,
        padding: 10,
        color: "#B2B2B2",
        // backgroundColor: "pink",
    },
}
export default ContactCell