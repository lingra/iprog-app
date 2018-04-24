import React, {Component} from 'react';
import './ProfilePage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class ProfilePage extends Component {
    
  render() {

      return (
        <div id="ProfilePage">
            <div className="row" id="header">
                <div className="col-sm-8"></div>
                <div className="col-sm-4">
                    <p id="webpage-title">M(yFave)Db</p>
                </div>
            </div>
              
            <div className="row">
                <div className="col-sm-6">
                    
                    
                </div>
                
                <div className="col-sm-6">
                    
                </div>
            </div>
        </div>
      );
  }
}

export default ProfilePage;

