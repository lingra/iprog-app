import React, {Component} from 'react';
import './SignUp.css';
import {modelInstance} from '../data/MovieModel';
import { Link, withRouter } from 'react-router-dom';
import {database, signUp, getUserID, getUserInfo, editProfile } from "../firebase";

let testVar = "";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }
    
    getSignUpInfo = () => {
        var userEmail = document.getElementById("signUpEmail").value;
        var userPassword1 = document.getElementById("signUpPassword1").value;
        var userPassword2 = document.getElementById("signUpPassword2").value;
        if (userPassword1 === userPassword2) {
            signUp(userEmail, userPassword1);
            console.log("kallat på signUp");
        }
        else {
            this.setState({
                message: "Passwords do not match. Please try again!"
            });
        }
    }

    render() {
          return (
            <div id="signuppage">
                <div class="row">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <p id="webpage-title">M(yFave)Db</p>
                    </Link>
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4" id="formDiv">
                        <p id="formTextSignUp">E-mail</p>
                        <input id="signUpEmail" type="text" class="formInput"/>
                        <p id="formTextSignUp">Create a password for M(yFave)Db</p>
                        <input id="signUpPassword1" class="formInput" type="password"/>
                        <p id="formTextSignUp">Repeat password</p>
                        <input id="signUpPassword2" class="formInput" type="password"/>
                        <div id="test">{this.state.message}</div>
                        {/* <Link to="main"> */}
                            <button onClick={() => this.getSignUpInfo()} id="signupBtn">Sign up!</button>
                        {/* </Link> */}
                    </div>
                    <div class="col-sm-4"></div>
                </div>
            </div>
          );
      }
}

export default Signup;
