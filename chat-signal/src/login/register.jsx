import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message } from 'antd';
import axios from 'axios';
import { DocumentClient } from "aws-sdk/clients/dynamodb";


export const Register = () => {
    const [username, getUsername] = useState(0); // react hooks
    const [email, getEmail] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks
    let history = useHistory();
    // NOTE: Will navigate to chatroom screen once isLoginVerified is set to true;
    let regSuccess = false;

    const authRegInfo = () => {

        //if auth succeed
        regSuccess = true;
        //else{
        //     isLoginVerified = false;
        // }
    }
    
    function handleUsername(event) {
        getUsername(event.target.value);
    }

    function handleEmail(event) {
        getEmail(event.target.value);
    }

    function handlePassword(event) {
        getPassword(event.target.value);
    }

    function handleCity(event) {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: 'GET',
            headers: {},
        })
        .then(res => {
            return res.text()
        }).then(ip => {
            console.log('ip', ip);
            // getIP(ip);
            var endpoint = "http://ip-api.com/json/" + ip + "?fields=city";
            fetch(endpoint)
            .then(response => response.json())
            .then(response => {
            getCity(response.city);
            });
        },);    
    }

    function handlePackage(event) {
        var JSONpackage = {username : username, email: email, password : password, city : city}
        console.log(JSONpackage); // here's the information in JSON format
    }

    function saltAndHash(event) {
        let curComp = this;
        // var plainPassword = this.state.password;
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log('A password was submitted: ' + password);
                console.log('This is hash: ' + hash);
                getPassword(hash);
            });
        });
    }

    useEffect(() => {
        handlePackage();
        if (city != "") {
            addDB();
        }
    }, [city]);

    async function addDB(event) {
        console.log("sending post to db...")
        axios.post('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
            { UserID: username, Email: email, Location: city, Password: password })
            .then(function (response) { console.log(response); })

        console.log("done sending post to db...")
    }

    const onRegPressed = () => {
        saltAndHash();
        handleCity();
        if (regSuccess) {
            //history.push('/chatroom');
            message.success('Successfully registered. Please log in!')
        } else {
            message.error('Registration failed. Please try again.');
        }
    }

    return (
        <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="Logo"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange={handleUsername}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="text" name="email" placeholder="email" onChange={handleEmail}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange={handlePassword}/>
                    </div>
                </div>
            </div>
            <div className="footer">
            <button onClick={onRegPressed} type="button" className="btn">
                    Register
            </button>
            </div>
        </div>
    )
}