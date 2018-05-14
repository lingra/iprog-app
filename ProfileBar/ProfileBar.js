import React, {Component} from 'react';
import './ProfileBar.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, toList, getUserID, getUserInfo, signOut, authentication } from "../firebase";


class ProfileBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            status: "",
            fetching: false
        };
        this.unsubscribe;
    }
    
    componentDidMount() {
        this.setState({
            name: "",
            image: "",
            fetching: true})
        
        //Attach listener to unsubscribe, so that we can stop listening when component unmounts
        this.unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    try {
                        this.setUser(snapshot.val().username, snapshot.val().image);
                    }
                    catch (e) {
                        // If username and img not set in firebase
                        this.setUser("", "");
                    }
                });
                console.log("hämtat data")
            } else {
                this.setState({
                    status: 'ANONYMOUS'
                });
                console.log("Ingen inloggad");
            }
        });
    }
  
    componentWillUnmount() {
        this.ref.off()
        this.unsubscribe(); //Stop listening to user
    }
    
    setUser(userName, userPic) {
        console.log("i set user");
        this.setState({
            name: userName,
            image: userPic,
            status: 'USER',
            fetching: false
        })
    }
          
  render() {
      console.log("state", this.state.status);
                         
      var listname = "";
      var loginbutton = "";
      
      var profileImg;
      var profileNm;
      var listInfo;
      var profileInf;
      
      switch (this.state.status) {
          case 'USER':
            if (this.state.name != "" && this.state.image != "") {
                profileImg = <img id="profilePic" alt="Your profile picture" src={this.state.image}/>
                profileNm = <p id="profileName">{this.state.name}</p>;
            } else {
                profileImg = (<div id="fakeProfile">
                                <span id="fakeUser" class="glyphicon glyphicon-user"></span>
                              </div>);
                profileNm = <p id="profileName">User</p>
                profileInf =  (<div>
                               <p id="#profileInf">To set your username and image. Click on your profile image to go to your profile and edit.</p>
                               </div>);
              }
              listInfo = (<div>
                            <span class="glyphicon glyphicon-list"></span><span id="title"> My lists</span>
                             
                            <div id="profileLists">
                                {listname}
                            </div>
                            <div>
                                <Link to="/">
                                    <span className="glyphicon glyphicon-plus"></span><span id="title"> Add list</span> 
                                </Link>
                            </div>
                           </div>);
              break;
              
          case 'ANONYMOUS':
              profileImg = (<div id="fakeProfile">
                                <span id="fakeUser" class="glyphicon glyphicon-user"></span>
                            </div>);
              profileNm = <p id="loginWarning">You must sign in to view your profile.</p>;
              profileInf = "";
              break;
      }
      
      
      return (
          <div id="ProfileBar">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="profileInfo">
                        {profileImg}
                        {profileNm}
                        {profileInf}
                    </div>
                </div>
                <div className="col-sm-1"></div>
              </div>  

              <div className="row">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                      {listInfo}
                  </div>
                  <div className="col-sm-1"></div>
              </div>
            </div>
      );
  }
}

export default ProfileBar;
