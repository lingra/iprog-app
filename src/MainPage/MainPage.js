import React, {Component} from 'react';
import './MainPage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import AllLists from '../AllLists/AllLists';
import ProfileBar from '../ProfileBar/ProfileBar';
import { database } from "../firebase";
import { signOut } from "../auth";

class MainPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }; 
    }
    
    componentDidMount() {
        var currentUser = modelInstance.getCookie("user");
        if (currentUser === "guest") {
            this.setState({
                user: 'GUEST',
                status: 'INITIAL'
            });
        } else {
            this.setState({
                user: 'USER',
                status: 'INITIAL'
            });
        }
    }
    
    signOutUser = () => {
        signOut();
    }
    
    
  render() {
      var info;
      var btn;
      
      switch(this.state.user) {
          case 'GUEST':
              btn = "in";
              break;
          case 'USER':
              btn = "out";
              break;
      }
      
      return (
        <div id="mainpage" className="nopadding">
            <div className="row nopadding" id="header">
            <div className="col-sm-5 nopadding">
            </div>
            <div className="col-sm-5 nopadding">
                <p id="webpage-title-small">M(yFave)Db</p>
            </div>
                <div className="col-sm-2 nopadding">
                    <Link to="/">
                        <button onClick={() => this.signOutUser()} className="signOutBtn">Sign {btn}</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 nopadding">
                    <div id="welcomeText">Welcome to M(yFave)Db! Here you can view all lists created by users. Please note it may take some time to load!</div>
                    <div id="mainListDiv">
                        <AllLists/>
                    </div>
                </div>
                <div className="col-sm-4 nopadding" id="profilebar">
                    <ProfileBar/>
                </div>
            </div>
        </div>
      );
  }
}

export default MainPage;