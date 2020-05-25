import React, { useState, useEffect, useCallback, Component } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message } from 'antd';
import useForceUpdate from 'use-force-update';
import axios from 'axios';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

var AWS = require("aws-sdk");
aws_access_key_id = AKIAUGOGGDYPDWITXGMT;
aws_secret_access_key = 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;
var myConfig = AWS.config.update({
    aws_access_key_id : "AKIAUGOGGDYPCSPZ5RB6",
    region: "us-west-2",
    endpoint: "https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod"
  });
var docClient = new AWS.DynamoDB.DocumentClient();
var hash;
AWS.config = myConfig;


//TODO: implement authentication.
export const Login = () => {
    const [username, getUsername] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [ipAddress, getIP] = useState(0); // react hooks
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
        var JSONpackage = { username: username, password: password, ip: ipAddress, location: city }
        console.log(JSONpackage); // here's the information in JSON format
    }, [city]);

    function handleCity(tempCity) {
        getCity(tempCity);
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: 'GET',
            headers: {},
        })
            .then(res => {
                return res.text()
            }).then(ip => {
                getIP(ip);
            });
        var endpoint = "http://ip-api.com/json/" + ipAddress + "?fields=city";
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                handleCity(response.city);
            });
    }
    
    

    function authenticate() {
        var trueFalse = verifyHash();
        console.log("HERE");
        if (trueFalse){
            isLoginVerified = true;
        }
        console.log(isLoginVerified);
        var params = { TableName: "AccountDB",
            Key:{
                "UserID" : "Jason", 
                "Email" : "jason@gmail.com", 
                "Location" : "Singapore", 
                "Password" : "$2a$10$fs7pMJBwBUHx/twmteN20u/20E4/Fkfv/0Qy3RUbuzkXD5.dXzssm"
            } }
        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Invalid Password. ", JSON.stringify(err, null, 2));
            } else {
                console.log("Valid Password, login succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
    
    function verifyHash(event) {
        var hash = "$2a$10$fs7pMJBwBUHx/twmteN20u/20E4/Fkfv/0Qy3RUbuzkXD5.dXzssm";
        const bcrypt = require('bcryptjs');
        bcrypt.compare(password, hash, function(err, res) {
            //console.log('Result: ' + res);
            if(res) {
                console.log("True");
                return res;
            } else {
                console.log("False");
            }
        });
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