import React, {Component} from 'react';
import './EditProfile.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, getUserID, getUserInfo, signOut, authentication, editProfile, editProfilePic } from "../firebase";

class EditProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            email: ""
        };
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
    
    componentWillUnmount() {
        this.ref.off()
        this.unsubscribe(); //Stop listening to user
    }
    
    setUser(userName, userPic, favGenre, favLine, favMovie, favActor, favSnack) {
        console.log(userPic);
        this.setState({
            name: userName,
            image: userPic,
            fGenre: favGenre,
            fLine: favLine,
            fMovie: favMovie,
            fActor: favActor,
            fSnack: favSnack,
            fetching: false
        })
    }
    
    
    
    getChangedInfo = () => {
        var userName = document.getElementById("userName").value;
        var userGenre = document.getElementById("userGenre").value;
        var userLine = document.getElementById("userLine").value;
        var userMovie = document.getElementById("userMovie").value;
        var userActor = document.getElementById("userActor").value;
        var userSnack = document.getElementById("userSnack").value;
        
        editProfile(userName, userGenre, userLine, userMovie, userActor, userSnack);
    }
    

  render() {
      
      
      return (
        <div id="EditProfilePage">
            <div className="row" id="header2">
                &#10006;
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                
                <div className="col-sm-4"></div>
                <div className="col-sm-4" id="formDiv">
                        <img src={this.state.image} id="profilePic" alt="Some profile Pic"/>
                        <button className="plusBtn" onClick={() => editProfilePic}>+</button>
                    <p id="formText">Username</p>
                    <input id="userName" className="formInput" type="text" value={this.state.name}/>
                    
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
                        
                    <Link to="profile">
                        <button onClick={() => this.getChangedInfo()} id="SubmitBtn">Submit Changes</button>
                    </Link>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
      );
  }
}

export default EditProfile;

