import React, {Component} from 'react';
import './Start.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class Start extends Component {

  render() {
      
      return (
        <div class="container-fluid" id="startpage">
            <div class="row">
                <p id="webpage-title">M(yFave)Db</p>
                <div class="col-sm-3"></div>
                <div class="col-sm-2">
                    <Link to="/signup">
                        <button id="signup" class="startpageBtn">Sign up</button>
                    </Link>
                </div>
                <div class="col-sm-2">
                    <Link to="login">
                        <button id="login" class="startpageBtn">Login</button>
                    </Link>
                </div>
                <div class="col-sm-2">
                    <Link to="main">
                        <button id="browse" class="startpageBtn">Browse lists</button>
                    </Link>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
      );
  }
}

export default Start;

