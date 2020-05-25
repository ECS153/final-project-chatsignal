import React, { useState, useEffect, useCallback, Component } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message } from 'antd';
import useForceUpdate from 'use-force-update';
import axios from 'axios';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

var AWS = require("aws-sdk");
var myConfig = AWS.config.update({
    region: "us-west-2",
    endpoint: "https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod"
    //endpoint: "http://localhost:3000"
  });
var docClient = new AWS.DynamoDB.DocumentClient();

AWS.config = myConfig;


//TODO: implement authentication.
export const Login = () => {
    const [username, getUsername] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
   // const [ipAddress, getIP] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks
    const forceUpdate = useForceUpdate();
    let history = useHistory();
    // NOTE: Will navigate to chatroom screen once isLoginVerified is set to true;
    let isLoginVerified = false;

    //TODO: implement authentication in authLoginInfo() below
    const authLoginInfo = () => {

        //if auth succeed
        isLoginVerified = true;
        //else{
        //     isLoginVerified = false;
        // }
    }

    function handleUsername(event) {
        getUsername(event.target.value);
        
    }
    function handlePassword(event) {
        getPassword(event.target.value);
       
    }

    useEffect(() => {
        var JSONpackage = { username: username, password: password,  location: city }
        console.log(JSONpackage); // here's the information in JSON format
    }, [city]);

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
    


    function authenticate() {
        
        console.log("HERE");
        var params = { TableName: "AccountDB",
            Key:{
                "UserID" : username, 
                "IP" : "0.0.0.0", 
                "Location" : city, 
                "Password" : password
            } }
        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Invalid Password. ", JSON.stringify(err, null, 2));
            } else {
                console.log("Valid Password, login succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
    



  

    function saltAndHash(event) {
        // var plainPassword = this.state.password;
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                console.log('A password was submitted: ' + password);
                console.log('This is hash: ' + hash);
                getPassword(hash);
                console.log('Hash password is: ' + password);
            });
        });
    }

  
    async function checkDB(event) {
        console.log("sending post to db...")
        axios.post('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
            { UserID: username, IP: "0.0.0.0", Location: city, Password: password })
            .then(function (response) { console.log(response); })

        console.log("done sending post to db...")
    }

    const onLoginPressed = () => {

        authLoginInfo();

        if (isLoginVerified) {
            // history.push('/chatroom');
            message.success('Logged in successfully. Start chatting!')
        } else {
            message.error('Login failed. Please try again.');
        }
        handleCity();
        saltAndHash();
        //checkDB();
        authenticate();
    }
    return (
        <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="Logo" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" onChange={handleUsername} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" onChange={handlePassword} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={onLoginPressed} type="button" className="btn">
                    Login
                </button>
            </div>
        </div>
    )
};