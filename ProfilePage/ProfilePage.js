import React, {Component} from 'react';
import './ProfilePage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import listImg from "../images/gradients1.jpg";
import { database, getUserID, getUserInfo, signOut, authentication } from "../firebase";


class ProfilePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            status: "",
            fGenre: "",
            fLine: "",
            fMovie: "",
            fActor: "",
            fSnack: "",
            fetching: false
        };
        this.unsubscribe;
    }
    
    componentDidMount() {
        this.setState({
            name: "",
            image: "",
            fGenre: "",
            fLine: "",
            fMovie: "",
            fActor: "",
            fSnack: "",
            status: 'USER',
            fetching: true})
        
        //Attach listener to unsubscribe, so that we can stop listening when component unmounts
        this.unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    this.setUser(snapshot.val().username, snapshot.val().image, snapshot.val().favgenre, snapshot.val().favline, snapshot.val().favmovie, snapshot.val().favactor, snapshot.val().favsnack);
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
    
    
    
    render() {
        
        
        var profileNm = <p id="profileName">{this.state.name}</p>;
        
        var profileImg = <img id="profilePic" alt="Your profile pic" src={this.state.image}></img>;
        
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
                        {profileImg}
                        <h3 id="profileName">{profileNm}</h3>
                        <div>
                            <h4>Profile information</h4>
                        </div>
                        <div className="container">
                            <div className="col-sm-8 facts">
                                <div className="col-sm-4" id="bold">
                                    <p>Favorite genre</p>
                                    <p>Favorite line</p>
                                    <p>Favorite movie</p>
                                    <p>Who would play me in a movie</p>
                                    <p>Favorite movie snack</p>
                                </div>
                                <div className="col-sm-4">
                                    <p>{this.state.fGenre}</p>
                                    <p>{this.state.fLine}</p>
                                    <p>{this.state.fMovie}</p>
                                    <p>{this.state.fActor}</p>
                                    <p>{this.state.fSnack}</p>
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
