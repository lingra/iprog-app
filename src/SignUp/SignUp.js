import React, {Component} from 'react';
import './SignUp.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class Signin extends Component {

  render() {
      
      return (
        <div class="container-fluid" id="signuppage">
            <div class="row">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                <div class="col-sm-4"></div>
                <div class="col-sm-4" id="formDiv">
                    <p id="formText">Username</p>
                    <input type="text" class="formInput"/>
                    <p id="formText">Password</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Repeat password</p>
                    <input class="formInput" type="text"/>
                    <Link to="main">
                        <button id="signupBtn">Sign up!</button>
                    </Link>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default Signin;

