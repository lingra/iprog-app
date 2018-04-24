import React, {Component} from 'react';
import './ProfileBar.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class ProfileBar extends Component {
  
  render() {
                         
      var listname = "";
      var loginbutton = "";
      
      return (
          <div id="ProfileBar">
              <div className="row" id="header">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    Image
                    <p>Linnéa Granlund</p>
                </div>
                <div className="col-sm-1"></div>
              </div>  

              <div className="row">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                      <p>My Lists</p>
                      <div>
                          {listname}
                      </div>
                      <div>
                          <Link to="/" style={{ textDecoration: 'none' }}>
                              <span class="glyphicon glyphicon-plus"></span><p id="add-list-profile"> Add List</p>
                          </Link>
                      </div>
                  </div>
                  <div className="col-sm-1"></div>
              </div>
            </div>
      );
  }
}

export default ProfileBar;
