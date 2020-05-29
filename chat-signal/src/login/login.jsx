import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message } from 'antd';
import axios from 'axios';

//TODO: implement authentication.
export const Login = () => {
    const [username, getUsername] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks

    let history = useHistory();
    // NOTE: Will navigate to chatroom screen once isLoginVerified is set to true;
    let isLoginVerified = false;

    function handleUsername(event) {
        getUsername(event.target.value);
    }

    function handlePassword(event) {
        getPassword(event.target.value);
    }

    const onLoginPressed = () => {
        handleCity();
    }

    async function fetchUserInfo(event) {
        console.log("sending post to db...")
        console.log(username)
        await axios.get('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
            {
                params: {
                    UserID: username
                }
            })
            .then(function (response) {
                if (!response.data.Item) {
                    message.error("Username is incorrect")
                } else {
                    var pwVerified = verifyHash(response.data.Item["Password"]["S"]);
                    var locVerified = verifyLocation(response.data.Item["Location"]["S"])
                    if (pwVerified && locVerified) {
                        isLoginVerified = true;
                    }
                    if (pwVerified && !locVerified) {
                        history.push("./emailpage");
                    }
                    console.log("Everything verified? " + isLoginVerified)
                }
            })
            .then(response => { checkVerified() });
        console.log("done sending post to db...")
    }

    function handleCity(event) {
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
                        // Reset City to trigger useeffect everytime login is pressed
                        getCity("");
                        getCity(response.city);
                    });
            });
    }

    useEffect(() => {
        if (city) {
            fetchUserInfo();
        }
    }, [city]);

    function checkVerified(event) {
        if (isLoginVerified) {
            message.success('Logged in successfully. Start chatting!')
            history.push({
                pathname: '/chatroom',
                state: { userID: username }
            })
        } else {
            message.error('Login failed. Please try again.');
        }
    }

    function verifyHash(hash) {
        //var hash = "$2a$10$fs7pMJBwBUHx/twmteN20u/20E4/Fkfv/0Qy3RUbuzkXD5.dXzssm";
        console.log("hash is " + hash);
        console.log("password is " + password);
        const bcrypt = require('bcryptjs');
        return bcrypt.compareSync(password, hash);
    }

    function verifyLocation(loc) {
        console.log("last loc is " + loc);
        console.log("current loc is " + city);
        if (loc === city) {
            return true;
        } else {
            return false;
        }
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