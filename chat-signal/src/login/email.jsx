import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { message} from 'antd';

export const Email  = () => {

const [email, getEmail] = useState(0); // react hooks
const [username, getUsername] = useState(0); // react hooks
const [password, getPassword] = useState(0); // react hooks
const [city, getCity] = useState(0); // react hooks
let isLoginVerified = false;
let history = useHistory();

function handleEmail(event) {
    getEmail(event.target.value);
}


function handleUsername(event){
    getUsername(event.target.value);

}
function handlePassword(event){
    getPassword(event.target.value);
}
function onPress(event){
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
    
    await axios.get('https://e770o4wls8.execute-api.us-west-2.amazonaws.com/prod',
    {
        params: {
            UserID : username
          }
    })
    .then(function (response) {
        if (!response.data.Item) {
            message.error("Username is incorrect")
        } else {
            var pwVerified = verifyHash(response.data.Item["Password"]["S"]);
            var emailVerified = verifyEmail(response.data.Item["Email"]["S"])
            if (pwVerified && emailVerified) {
                isLoginVerified = true;
            }
        }
    })
    .then(response => {checkVerified()});
    console.log("done sending post to db...")
}

function verifyEmail(tempEmail) {
    if (tempEmail === email) {
        return true;
    } else {
        return false;
    }
}

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
    const bcrypt = require('bcryptjs');
    return bcrypt.compareSync(password, hash);
}

    return (
     <div className="base-container">
                <b></b>
            <div className="content">
                <div>You have attempted to login from an unregistered location. Please enter your username and password again, along with your email.</div>
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
            <button onClick={onPress} type="button" className="btn">
                    Login
            </button>
            </div>
        </div>




    );


}