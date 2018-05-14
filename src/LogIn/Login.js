import React, {Component} from 'react';
import './Login.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from "../auth";

class Login extends Component {
    
  constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            done: false
        }; 
    }

    componentDidMount() {
        this.setState({
            errorMsg: "",
            done: false
        });
    }
    
    displayError = (error) => {
        this.setState({
            errorMsg: (<div id="errorMsg">
                         <span class="glyphicon glyphicon-comment"></span><span> {error.message}</span>
                       </div>)
        })
    }
    
    redirect = () => {
        this.setState({
            done: true,
            errorMsg: ""
        });
    }
    
    renderRedirect = () => {
        // If login ok redirect to main
        if (this.state.done) {
            return <Redirect to='/main'></Redirect>
        }
    }
    
    signInUser = () => {
        var userEmail = document.getElementById("userEmail").value;
        var userPassword = document.getElementById("userPassword").value;
        signIn(userEmail, userPassword).then(() => this.redirect()).catch((error) => this.displayError(error));
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
                    {this.state.errorMsg}
                    <button onClick={() => this.signInUser()} id="loginBtn">Login</button>
                    {this.renderRedirect()}
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default Login;

