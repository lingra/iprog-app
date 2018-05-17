import React, {Component} from 'react';
import './EditProfile.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, getUsername, getTrivia, editProfile, getProfilePic } from "../firebase";

class EditProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            userImage: ""
        };
    }
    
    componentDidMount() {
        var currentUser = modelInstance.getCookie("user");
        if (currentUser !== "guest") {
            this.ref1 = getUsername(currentUser);
            this.ref1.on('value', snapshot => {
                this.setUsername(snapshot.val())
            })
            this.ref2 = getTrivia(currentUser);
            this.ref2.on('value', snapshot => {
                try {
                    this.setTrivia(snapshot.val().favgenre, snapshot.val().favline, snapshot.val().favmovie, snapshot.val().favactor, snapshot.val().favsnack);
                }
                catch (e) {
                    this.setTrivia("", "", "", "", "");
                }
            })
            
            this.ref3 = getProfilePic(currentUser);
            this.ref3.on('value', snapshot => {
                this.setProfilePic(snapshot.val());
                this.setState({
                    status: 'USER'
                })
            })
            
        } else {
            var showError = document.getElementById("loginErrorContainer");
            showError.style.display = 'block';
        }
    }
    
/*
        this.unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    this.setUser(snapshot.val().username, snapshot.val().image, snapshot.val().email, snapshot.val().favgenre, snapshot.val().favline, snapshot.val().favmovie, snapshot.val().favactor, snapshot.val().favsnack);
                })
                console.log("hämtat data")
            } else {
                console.log("Ingen inloggad");
            }
        });
    }
    */
    
    componentWillUnmount() {
        this.ref1.off()
        this.ref2.off()
    }
    
    setUsername(username) {
        var userName = document.getElementById("userName");
        username.trim();
        if (username === "") {
            console.log("hrj");
            this.setState({
                    msg: <div id="msg"><span className="glyphicon glyphicon-comment"></span><span> You forgot to set a username!</span></div>
                });
        }
        userName.value = username;
    }
    
    setProfilePic(userImage) {
        this.setState({
            userImage: userImage
        })
    }
    
    setTrivia(favGenre, favLine, favMovie, favActor, favSnack) {
        var userGenre = document.getElementById("userGenre");
        userGenre.value = favGenre;
        
        var userLine = document.getElementById("userLine");
        userLine.value = favLine;
        
        var userMovie = document.getElementById("userMovie");
        userMovie.value = favMovie;
        
        var userActor = document.getElementById("userActor");
        userActor.value = favActor;
        
        var userSnack = document.getElementById("userSnack");
        userSnack.value = favSnack;
    }
     
    getChangedInfo = () => {
        var userName = document.getElementById("userName").value;
        var userGenre = document.getElementById("userGenre").value;
        var userLine = document.getElementById("userLine").value;
        var userMovie = document.getElementById("userMovie").value;
        var userActor = document.getElementById("userActor").value;
        var userSnack = document.getElementById("userSnack").value;
        
        if (userName == "") {
            this.setState({
                    msg: <div id="msg"><span className="glyphicon glyphicon-comment"></span><span> You forgot to set a username!</span></div>
                });
        } else {
            this.setState({
                msg: ""
            });
            editProfile(userName, userGenre, userLine, userMovie, userActor, userSnack);
            console.log("hehjehj");
            this.redirect();
        }
    }
    
    redirect = () =>  {
        this.setState({
            done: true
        });
    }
    
    renderRedirect = () => {
        // If done with list redirect back to main or fullscreen list
        if (this.state.done) {
            if (this.state.done) {
                return <Redirect to='/profile'></Redirect>
            }
        }
    }
    

  render() {
      var image;
      
      switch (this.state.status) {
          case 'USER':
              if (this.state.userImage != 'Unknown') {
                  image = <img src={this.state.userImage} id="profilePic" alt="Some profile Pic"/>;
                  
              } else {
                  image = (<div id="fakeProfile">
                                <span id="fakeUser" className="glyphicon glyphicon-user"></span>
                            </div>);
            }
              break;
      }
      
      return (
        <div id="EditProfilePage">
            <div className="row">
                <div id="loginErrorContainer">
                    <p id="loginErrorTitle">Uh oh!</p>
                    <p id="loginErrorParagraph">How did you end up here? Only signed in users can edit their profile.</p>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <Link to="/profile" id="goToProfile">
                            <span className="glyphicon glyphicon-arrow-left" id="goToProfile"></span>
                        </Link>
                    </div>
                    <p id="webpage-title">Edit Image</p>
                </div>
                
                <div className="col-sm-4"></div>
                <div className="col-sm-4" id="formDiv">
                        {image}
                    <p id="formText">Username</p>
                    <input id="userName" className="formInput" type="text" />
                    
                    <p id="fiveShort">5 short</p>
                    <p id="formText">Favorite Genre</p>
                    <input id="userGenre" className="formInput" type="text"/>
                    <p id="formText">Favorite Line</p>
                    <input id="userLine" className="formInput" type="text"/>
                    <p id="formText">Favorite Movie</p>
                    <input id="userMovie" className="formInput" type="text"/>
                    <p id="formText">Who would play me in a movie</p>
                    <input id="userActor" className="formInput" type="text"/>
                    <p id="formText">Favorite movie snack</p>
                    <input id="userSnack" className="formInput" type="text"/>
                    
                    {this.state.msg}
                    
                    <button onClick={() => this.getChangedInfo()} id="SubmitBtn">Submit Changes</button>
                    
                    {this.renderRedirect()}
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default EditProfile;

