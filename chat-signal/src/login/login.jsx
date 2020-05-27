import React, { useState, useEffect, useCallback, Component } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message, InputNumber } from 'antd';
import useForceUpdate from 'use-force-update';
import axios from 'axios';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

//TODO: implement authentication.
export const Login = () => {
    const [username, getUsername] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [ipAddress, getIP] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks
    const [tasks, getTasks] = useState(0); // react hooks
    const [verified, getVerified] = useState(0);
    const [tempPassword, getTempPassword] = useState(0);

    let history = useHistory();
    // NOTE: Will navigate to chatroom screen once isLoginVerified is set to true;
    let isLoginVerified = false;
    let retrieveUser = "";

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
    
    function handleTasks(event) {
        getTasks(event.target.value);
    }

    async function fetchUserInfo(event){
        var tempPW;
        console.log("sending post to db...")
        console.log(username)
        await axios.get('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
        {
            params: {
                UserID : username
              }
        })
        .then(function (response) {
            getTempPassword(response.data.Item["Password"]["S"]);
    
        })
        
        console.log("done sending post to db...")
    }

    

    useEffect(() => {
       // var JSONpackage = { username: username, password: password, location: city }
       

        if (city != "") {
            authenticate();
            verifyHash(tempPassword);
        console.log("verified is " + verified);
        }
        
    }, [city, verified]);
    
    function handleCity(tempCity) {
        getCity(tempCity);
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: 'GET',
            headers: {},
        })
            .then(res => {
                return res.text()
            }).then(ip => {
                var endpoint = "http://ip-api.com/json/" + ip + "?fields=city";
                fetch(endpoint)
                    .then(response => response.json())
                    .then(response => {
                        handleCity(response.city);
                    });
            });
        
    }
    
    

    function authenticate() {
        fetchUserInfo();
        
    }
    
    function verifyHash(hash) {
        //var hash = "$2a$10$fs7pMJBwBUHx/twmteN20u/20E4/Fkfv/0Qy3RUbuzkXD5.dXzssm";
        console.log("hash is " + hash);
        console.log("password is " + password);
        const bcrypt = require('bcryptjs');
        bcrypt.compare(password, hash, function(err, res) {
            //console.log('Result: ' + res);
            if(res) {
                getVerified(true);
               // return true;
            } else {
                getVerified(false);
               // return false;
            }
        });
    }

    const onLoginPressed = () => {

        authLoginInfo();

        if (isLoginVerified) {
            //history.push('/chatroom');
            message.success('Logged in successfully. Start chatting!')
        } else {
            message.error('Login failed. Please try again.');
        }
        handleCity();    
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