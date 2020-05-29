import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import logoImg from "../chatsignal.png"
import { message} from 'antd';

export const Email  = () => {
    const location = useLocation();
    const [email, getEmail] = useState(0); // react hooks
    const [password, getPassword] = useState(0); // react hooks
    const [city, getCity] = useState(0); // react hooks
    let history = useHistory();

    function handleEmail(event) {
        getEmail(event.target.value);
    }
    function handlePassword(event){
        getPassword(event.target.value);
    }
    function onPress(event){
        console.log(location.state.userID);
        handleCity(); 
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
        },);    
    }

    useEffect(() => {
        if (city) {
            fetchUserInfo();
        }
    }, [city]);

    async function fetchUserInfo(){
        console.log("start verify user from db...")
        var pwEmailOK = false;
        var storedEmail;
        var storedPW;
        await axios.get('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
        {
            params: {
                UserID : location.state.userID
            }
        })
        .then(function (response) {
            if (password && email){
                storedEmail = response.data.Item["Email"]["S"]
                storedPW = response.data.Item["Password"]["S"];
                var pwVerified = verifyHash(storedPW);
                var emailVerified = verifyEmail(storedEmail);
                if (pwVerified && emailVerified) {
                    pwEmailOK = true;
                }
            }
        })
        .then(response => {
            addDB(storedEmail, storedPW, pwEmailOK);
        });
        console.log("done verifying user from db...")
    }

    function verifyEmail(tempEmail) {
        if (tempEmail === email) {
            return true;
        } else {
            return false;
        }
    }

    function verifyHash(hash) {
        const bcrypt = require('bcryptjs');
        return bcrypt.compareSync(password, hash);
    }

    function checkVerified(verSuccess) {
        if (verSuccess) {
            message.success('Successfully verified. Start chatting!')
            history.push({
                pathname: '/chatroom',
                state: { userID: location.state.userID }
            })
        } else {
            message.error('Verification failed. Please try again.');
        }
    }

    async function addDB(storedEmail, storedPW, pwEmailOK) {
        var verSuccess = false;
        if (pwEmailOK) {
            console.log("sending post to db...")
            axios.post('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
                { UserID: location.state.userID, Email: storedEmail, Location : city, Password: storedPW })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        verSuccess = true;
                    }
                    checkVerified(verSuccess);
                });
            console.log("done sending post to db...")
        } else {
            checkVerified(verSuccess);
        }
    }
    
    return (
        <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="Logo" onClick={() => history.goBack()} className="imageclick"/>

                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" readOnly value={location.state.userID}/>
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
            <button onClick={onPress} type="button" className="btn">
                    Verify
            </button>
            </div>
        </div>
    );
}