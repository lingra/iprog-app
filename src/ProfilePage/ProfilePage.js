import React, {Component} from 'react';
import './ProfilePage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import listImg from "../images/gradients1.jpg";


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
                  <div className="col-sm-1"></div>
                    <div className="col-sm-8 profileInfo">
                        <img id="profilePic" alt="Some profile Pic" src={profileImg}></img>
                        <h3 id="profileName">Username</h3>
                        <div>
                            <h4>Profile information</h4>
                        </div>
                        <div className="container">
                            <div className="col-sm-8 facts">
                                <div className="col-sm-4" id="bold">
                                    <p>name</p>
                                    <p>email</p>
                                    <p>favorite genre</p>
                                    <p>who would play me in a movie</p>
                                    <p>favorite movie snack</p>
                                    <p>movie at the cinema or at home</p>
                                    <p>Harry Potter or Star Wars?</p>
                                </div>
                                <div className="col-sm-4">
                                    <p>my name</p>
                                    <p>my email</p>
                                    <p>my favorite genre</p>
                                    <p>my actor</p>
                                    <p>my favorite snack</p>
                                    <p>cinema vs home</p>
                                    <p>Harry Potter vs Star Wars</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                    <Link to="EditProfile">
                        <div id="eBtn">
                            <button id="editBtn">Edit</button>
                        </div>
                    </Link>
                    </div>
                    
                </div>

                {/*END OF PROFILE COLUMN*/}

                <div className="col-sm-6">
                    <p id="list">My Lists</p>
                    <div className="col-sm-4 container"> 
                    {/*  {dish.extendedIngredients.map((mylists) =>
                        <p>{ingredient.amount*modelInstance.getFullMenu()}</p>)} */}
                        
                        <img src={listImg} alt="my list" id="imgTd"></img>
                        <p id="add">My first list</p> 
                    </div>

                    <div id="addBtnDiv">
                      <Link to="mylists">
                        <button className="addBtn">+</button>
                      </Link>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default ProfilePage;
