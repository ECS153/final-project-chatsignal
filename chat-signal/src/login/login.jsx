import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "../chatsignal.png"


//TODO: Need to add login authentication. Only change "isLoginVerified" to true after successful verification
export const Login = () => {
    let history = useHistory();
    /*
    NOTE for the team:
        Will navigate to chatroom screen once isLoginVerified is set to true;
        p.s. to set it, do it like this -> setIsLoginVerified(true)
        p.s. this is react hooks with JS es6. (new/clean ways to write react component)
    */
    const [isLoginVerified, setIsLoginVerified] = useState(false);

    const onLoginPressed = () => {
        console.log("User pressed on login button...");
        //TODO: Add a function to verify login & update isLoginVerified accordingly
        // if (isLoginVerified) {
        history.push('/chatroom');
        // }

    }
    return (
        <div className="base-container">
            {/* <div className="header">Login</div> */}
            <div className="content">
                <div className="image">
                    <img src={logoImg} alt="Logo" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="password" />
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
