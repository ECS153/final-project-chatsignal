import React, { Component } from "react";
import logoImg from "../chatsignal.png"

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            ip: '',
            city: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value}, ()=> {
            fetch('https://api.ipify.org?format=jsonp?callback=?', {
                method: 'GET',
                headers: {},
            })
            .then(res => {
                return res.text()
            }).then(ip => {
                console.log('ip', ip);
                this.setState({ ip: ip}, ()=> {
                    this.getCity();
                });
            }
            );
        });
        
    }
    
    getCity() {
        var endpoint = "http://ip-api.com/json/" + this.state.ip + "?fields=city";
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                this.setState({
                    city: response.city
                })
            })
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.username);
        // alert('An email was submitted: ' + this.state.email);
        // alert('A password was submitted: ' + this.state.password);
        alert('Your IP is: ' + this.state.ip);
        alert('Your city is: ' + this.state.city);
        //event.preventDefault();
    }

    render() {
        return <div className="base-container">
            {/* <div className="header">Register</div> */}
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="Logo"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="text" name="email" placeholder="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="password" onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
            <div className="footer">
            <button type="button" className="btn" onClick={this.handleSubmit}>
                Register
            </button>
            </div>
        </div>
    }
}