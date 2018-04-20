import React, {Component} from 'react';
import './Login.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class Login extends Component {

  render() {
      
      return (
        <div class="container-fluid" id="loginpage">
            <div class="row">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                <div class="col-sm-4"></div>
                <div class="col-sm-4" id="formDiv">
                    <p id="formText">Username</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Password</p>
                    <input class="formInput" type="text"/>
                    <Link to="main">
                        <button id="loginBtn">Login</button>
                    </Link>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default Login;

