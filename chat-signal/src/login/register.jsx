import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message } from 'antd';
import axios from 'axios';

export const Register = () => {
    const passwordStrength = require('check-password-strength')
    const [username, getUsername] = useState(0); // react hooks
    const [email, getEmail] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks
    let history = useHistory();
    let regSuccess = false;

    function checkRegistered(success) {
        if (regSuccess) {
            message.success('Successfully registered. Please login!');
            history.go('/');
        } else {
            message.error('Registration failed. Please try again.');
        }
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
            var endpoint = "http://ip-api.com/json/" + ip + "?fields=city";
            fetch(endpoint)
            .then(response => response.json())
            .then(response => {
            getCity("");
            getCity(response.city);
            });
        },);    
    }

    useEffect(() => {
        if (city) {
            addDB();
        }
    }, [city]);

    function saltAndHash(event) {
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log('A password was submitted: ' + password);
                console.log('This is salt: ' + salt);
                console.log('This is hash: ' + hash);
                getPassword(hash);
            });
        });
    }

    async function addDB(event) {
        console.log("sending post to db...")
        axios.post('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
            { UserID: username, Email: email, Location: city, Password: password })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    regSuccess = true;
                }
                checkRegistered();
            });
        console.log("done sending post to db...")
    }

    async function checkForm(event){
        var userNoExist;
        console.log("checking for user exist...")
        if (!username) {
            message.error('No username given! Please try again.');
            console.log("done checking user...");
        } else {
            await axios.get('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
            {
                params: {
                    UserID : username
                }
            })
            .then(function (response) {
                if (!response.data.Item) {
                    userNoExist = true;
                } else {
                    userNoExist = false;
                }
                console.log("done checking user...")
            })
            .then(response => {
                if (!email) {
                    message.error('No email given! Please try again.')
                } else {
                    if (!password) {
                        message.error('No password given! Please try again.')
                    } else if (passwordStrength(password).value !== "Weak") {
                        if (userNoExist) {
                            saltAndHash();
                            handleCity();
                        } else {
                            message.error('Username already exists! Please try again.')
                        }
                    } else {
                        message.error('Password to weak! Please try again.')
                    }
                }
            });
        }
    }

    const onRegPressed = () => {
        checkForm();
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