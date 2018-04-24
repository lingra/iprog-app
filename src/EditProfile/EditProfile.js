import React, {Component} from 'react';
import './EditProfile.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class EditProfile extends Component {

  render() {
      
      return (
        <div id="EditProfilePage">
            <div class="row">
                &#10006;
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                
                <div class="col-sm-4"></div>
                <div class="col-sm-4" id="formDiv">
                    <p id="formText">Name</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Email</p>
                    <input class="formInput" type="text"/>
                    <p>5 short</p>
                    <p id="formText">Best movie</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Favorite Genre</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Favorite Actor</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">Favorite Line</p>
                    <input class="formInput" type="text"/>
                    <p id="formText">If they made a movie about my life, ___ would play me.</p>
                    <input class="formInput" type="text"/>
                    <Link to="profile">
                        <button id="SubmitBtn">Submit</button>
                    </Link>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default EditProfile;

