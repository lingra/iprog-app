import React, {Component} from 'react';
import './Start.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class Start extends Component {
    
    componentDidMount() {
        // Clear all cookies for safety measure
        modelInstance.removeCookie("user");
        modelInstance.removeCookie("list");
        modelInstance.removeCookie("edit");
        
        // Set cookie as guest
        modelInstance.setUserCookie();
    }

  render() {
      
      return (
        <div id="startpage">
            <div className="row">
                <p id="webpage-title-start">M(yFave)Db</p>
                <div className="col-sm-3"></div>
                <div className="col-sm-2">
                    <Link to="/signup">
                        <button id="signup" className="startpageBtn">Sign up</button>
                    </Link>
                </div>
                <div className="col-sm-2">
                    <Link to="login">
                        <button id="login" className="startpageBtn">Login</button>
                    </Link>
                </div>
                <div className="col-sm-2">
                    <Link to="main">
                        <button id="browse" className="startpageBtn">Browse lists</button>
                    </Link>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
      );
  }
}

export default Start;

