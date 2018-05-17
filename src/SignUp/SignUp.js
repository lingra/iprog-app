import React, {Component} from 'react';
import './SignUp.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from "../auth";
import { setupUser } from "../firebase";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            done: false
        }
    }
    
    componentDidMount() {
        this.setState({
            errorMsg: "",
            done: false
        });
    }
    
    displayError = (error) => {
        if (error.message) {
            this.setState({
                errorMsg: (<div id="errorMsg">
                             <span class="glyphicon glyphicon-comment"></span><span> {error.message}</span>
                           </div>)
            })
        } else {
            this.setState({
                errorMsg: (<div id="errorMsg">
                             <span class="glyphicon glyphicon-comment"></span><span> {error}</span>
                           </div>)
            })
        }
    }
    
    redirect = () => {
        this.setState({
            done: true,
            errorMsg: ""
        });
    }
    
    renderRedirect = () => {
        // If signup ok redirect to main
        if (this.state.done) {
            return <Redirect to='/main'></Redirect>
        }
    }
    
    getSignUpInfo = () => {
        var username = document.getElementById("signUpUser").value;
        var userEmail = document.getElementById("signUpEmail").value;
        var userPassword1 = document.getElementById("signUpPassword1").value;
        var userPassword2 = document.getElementById("signUpPassword2").value;
        if (userPassword1 === userPassword2) {
            signUp(userEmail, userPassword1).then(() => this.setUpUserInfo(username, modelInstance.getCookie("user"))).catch((error) => this.displayError(error));
        }
        else {
            this.displayError("Passwords do not match. Please try again!");
        }
    }
    
    setUpUserInfo = (username, value) => {
        setupUser(username, value).then(() => this.redirect()).catch((error) => this.displayError(error));
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
                        <p id="formTextSignUp">Username</p>
                        <input id="signUpUser" type="text" class="formInput"/>
                        <p id="formTextSignUp">E-mail</p>
                        <input id="signUpEmail" type="text" class="formInput"/>
                        <p id="formTextSignUp">Create a password for M(yFave)Db</p>
                        <input id="signUpPassword1" class="formInput" type="password"/>
                        <p id="formTextSignUp">Repeat password</p>
                        <input id="signUpPassword2" class="formInput" type="password"/>
                        {this.state.errorMsg}
                        <button onClick={() => this.getSignUpInfo()} id="signupBtn">Sign up!</button>
                        {this.renderRedirect()}
                    </div>
                    <div class="col-sm-4"></div>
                </div>
            </div>
          );
      }
}

export default Signup;
