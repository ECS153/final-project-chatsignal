import React, { Component } from "react";
import logoImg from "../chatsignal.png"
import { Result } from "antd";

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
        this.getCity = this.getCity.bind(this);
        this.saltAndHash = this.saltAndHash.bind(this);
        this.handlePackage = this.handlePackage.bind(this);
        // this.verifyHash = this.verifyHash.bind(this);
    }

    handleChange(event) {
            this.setState({ [event.target.name]: event.target.value});
    }
    

    getCity() {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: 'GET',
            headers: {},
        })
        .then(res => {
            return res.text()
        }).then(ip => {
            console.log('ip', ip);
            this.setState({ ip: ip}, ()=> {
                var endpoint = "http://ip-api.com/json/" + this.state.ip + "?fields=city";
                fetch(endpoint)
                    .then(response => response.json())
                    .then(response => {
                        // console.log(response)
                        this.setState({
                            city: response.city
                        }, () => this.handleSubmit())
                    })
            });
        }
        );
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.username);
        // alert('An email was submitted: ' + this.state.email);
        // alert('A password was submitted: ' + this.state.password);
        // alert('Your IP is: ' + this.state.ip);
        // alert('Your city is: ' + this.state.city);
        //event.preventDefault();
        this.handlePackage();
    }

    handlePackage(event) {
        var tempPackage = {name : this.state.username, password : this.state.password};
        console.log(tempPackage);
    }

    saltAndHash(event) {
        let curComp = this;
        // var plainPassword = this.state.password;
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(curComp.state.password, salt, function(err, hash) {
                console.log('A password was submitted: ' + curComp.state.password);
                console.log('This is hash: ' + hash);
                curComp.setState({password : hash});
                console.log('Hash password is: ' + curComp.state.password);
            });
        });
    }

    // verifyHash(event) {
    //     var hash = this.state.hash;
    //     const bcrypt = require('bcryptjs');
    //     bcrypt.compare("123", hash, function(err, res) {
    //         console.log('Result: ' + res);
    //     });
    // }

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
            <button type="button" className="btn" onClick={()=> {
                this.getCity();
                this.saltAndHash();
                // this.verifyHash();
            }}>
                Register
            </button>
            </div>
        </div>
    }
}