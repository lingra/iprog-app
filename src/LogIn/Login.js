import React, {Component} from 'react';
import './Login.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import { signIn } from "../firebase";

// Bra länk: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-sign-in



class Login extends Component {
    loginUser = function() {
        var userEmail = document.getElementById("userEmail").value;
        var userPassword = document.getElementById("userPassword").value;
        console.log("User info", userEmail, userPassword);
        signIn(userEmail, userPassword);
    }

  render() {
      
      return (
        <div id="loginpage">
            <div class="row">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                <div class="col-sm-4"></div>
                <div class="col-sm-4" id="formDiv">
                    <p id="formText">Username</p>
                    <input id="userEmail" class="formInput" type="text"/>
                    <p id="formText">Password</p>
                    <input id="userPassword" class="formInput" type="password"/>
                    
                    <Link to="main">
                        <button onClick={() => this.loginUser()} id="loginBtn">Login</button>
                    </Link>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default Login;

