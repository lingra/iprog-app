import React, {Component} from 'react';
import './ProfilePage.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import listImg from "../images/gradients1.jpg";
import { database, getUserLists, getProfile, getList, getTrivia } from "../firebase";


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
            status: "",
            list: [],
            visit: false
        };
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
            status: "LOADING",
            list: []
        })
        
        var currentUser = modelInstance.getCookie("user");
        
        if (currentUser === "guest") {
            var showError = document.getElementById("loginErrorContainer");
            showError.style.display = 'block';
        } else {
            this.ref = getProfile(currentUser);
            this.ref2 = getUserLists(currentUser);
            this.ref3 = getTrivia(currentUser);
            if (currentUser !== "guest") {
                this.ref.on('value', snapshot => {
                    this.setUser(snapshot.val().username, snapshot.val().image);
                })
                this.ref2.on('value', snapshot => {
                    this.setState({list: []});
                    this.displayLists(snapshot.val());
                })
                this.ref3.on('value', snapshot => {
                    this.setTrivia(snapshot.val());
                })
            } else {
                this.setState({
                    status: 'ANONYMOUS'
                })
            };
        }
    }
    
    componentWillUnmount() {
        this.ref.off()
        this.ref2.off()
    }
    
    setUser(userName, userPic) {
        this.setState({
            name: userName,
            image: userPic,
            status: 'USER'
        })
    }
    
    setTrivia(triviaArray) {
        if (triviaArray) {
            if (triviaArray["favactor"]) {
                this.setState({
                    fActor: triviaArray["favactor"]
            });
            }if (triviaArray["favgenre"]) {
                this.setState({
                    fGenre: triviaArray["favgenre"]
            });
            }
            if (triviaArray["favline"]) {
                this.setState({
                    fLine: triviaArray["favline"]
            });
            }
            if (triviaArray["favmovie"]) { 
                this.setState({
                    fMovie: triviaArray["favmovie"]
            });
            }
            if (triviaArray["favsnack"]) { 
                this.setState({
                    fSnack: triviaArray["favsnack"]
            });
            };
        }
    }

    displayLists(obj) {
        for (var key in obj) {
            var id = JSON.parse(obj[key]["list"])[0];
            this.getMovieInfo(obj, key, id);
        }
    }
    
    getMovieInfo = (obj, key, id) => {
        modelInstance.getMovie(id).then(movie => {
            var movieObj = this.saveListMovie(key, obj[key]["title"], movie.Poster);
            
            
            let list = Array.from(this.state.list); 
            list.push(movieObj); 
            this.setState({list});
        });
    }
    
    saveListMovie = (listID, listTitle, moviePoster) => {
        var movieObj = {};
        movieObj.listId = listID;
        movieObj.title = listTitle;
        movieObj.image = moviePoster;
        return movieObj;
    }

    fullscreenList = (e) => {
        modelInstance.removeCookie("list");
        modelInstance.setActiveListCookie(e.target.id);
        this.redirect();
    }
    
    redirect = () => {
        this.setState({
            visit: true
        });
    }
    
    renderRedirect = () => {
        // If visit list true redirect to fullscreen
        if (this.state.visit) {
            return <Redirect to='/fullscreen'></Redirect>
        }
    }
    
    
    render() {
        var profileNm;
        var profileImg;
        var fullList;
        var listInfo; 
        
        var addListDiv = (<div className="col-sm-4 container" key="listId" id="listContainer"> 
                            <Link to="/create" style={{ textDecoration: 'none' }}>
                            <div className="listImgContainer">
                                <div id="imgWrapper">
                                    <div className="posterFill">
                                        <div className="posterTextFill">Add List <br /><span className="glyphicon glyphicon-plus" ></span></div>
                                    </div>
                                </div>
                            </div>
                                </Link>
                        </div>);
        
        switch (this.state.status) {
            case 'LOADING':
                 listInfo = <img id="load" src="https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif"/>;
              break;
                
            case 'USER':
                
                if (this.state.name != "" && this.state.image != "Unknown") {
                    profileNm = <p id="profileName">{this.state.name}</p>;
                    profileImg = <img id="profilePic" alt="Your profile pic" src={this.state.image}></img>;
                    
                } else {
                    profileImg = (<div id="fakeProfile">
                                    <span id="fakeUser" className="glyphicon glyphicon-user"></span>
                                </div>);
                    profileNm = <p id="profileName">{this.state.name}</p>;
                }
                
                fullList = this.state.list.map((item) => {
                        var testImg;
                        var posterImg = item.image;
                    
                        if (posterImg === 'N/A') {
                          testImg = (<div className="listImgContainer" id={item.id}>
                                          <div id="imgWrapper">
                                             <div className="posterFill" id={item.id}>
                                                 <div id={item.id} className="posterTextFill">Poster not available</div>
                                              </div>
                                          </div>
                                       </div>);
                        }
                        else if (posterImg === 'error') {
                          testImg = (<div className="listImgContainer" id={item.id}>
                                          <div id="imgWrapper">
                                             <div className="posterFill" id={item.id}>
                                                 <div className="apiErrMsg" id={item.id}>Sorry! Unable to fetch poster from API.</div>
                                              </div>
                                          </div>
                                       </div>);
                        }
                        else {
                            testImg = (<div className="listImgContainer" id={item.id}>
                                            <div className="imgWrapper" id={item.id}>
                                                <img className="posterImg" src={posterImg} alt="Poster Img" id={item.listId}/>
                                            </div>
                                       </div>)
                        }
                        
                        return (<div className="col-sm-4 container" key={item.listId} onClick={(e) => this.fullscreenList(e)} id="listContainer">
                                <div >
                                    {testImg}
                                </div>
                                <div className="listTextContainer">
                                    <div className="titleText" id={item.listId} >
                                        {item.title}
                                    </div>
                                </div>
                                
                            </div>);
                });

                
                listInfo = (<div id="profileLists">
                                {fullList}
                                {addListDiv}
                            </div>);
              break;
                
            case 'ANONYMOUS':
                break;
        }
        
        
        
        return (
            <div id="ProfilePage">
                <div className="row">
                    <div id="loginErrorContainer">
                        <p id="loginErrorTitle">Uh oh!</p>
                        <p id="loginErrorParagraph">How did you end up here? Only signed in users can view your profile.</p>
                    </div>
                    <div className="col-sm-6">
                        <div className="col-sm-1">
                            <Link to="/main" id="titlelink">
                                <span className="glyphicon glyphicon-home" id="returnHome"></span>
                            </Link>
                        </div>
                        <div className="col-sm-8 profileInfon">
                            {profileImg}
                            <h3 id="profileName">{profileNm}</h3>
                            <div>
                                <h4>Profile information</h4>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8 facts">
                                        <div className="row" id="question">
                                            <div className="col-sm-4" id="bold">Favorite genre</div>
                                            <div className="col-sm-4">{this.state.fGenre}</div>
                                        </div>
                                        <div className="row" id="question">
                                            <div className="col-sm-4" id="bold">Favorite line</div>
                                            <div className="col-sm-4">{this.state.fLine}</div>
                                        </div>
                                        <div className="row" id="question">
                                            <div className="col-sm-4" id="bold">Favorite movie</div>
                                            <div className="col-sm-4">{this.state.fMovie}</div>
                                        </div>
                                        <div className="row" id="question">
                                            <div className="col-sm-4" id="bold">Who would play me in a movie</div>
                                            <div className="col-sm-4">{this.state.fActor}</div>
                                        </div>
                                        <div className="row" id="question">
                                            <div className="col-sm-4" id="bold">Favorite movie snack</div>
                                            <div className="col-sm-4">{this.state.fSnack}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <Link to="EditImage">
                                <div id="eBtn">
                                    <button id="editImgBtn">Edit Image</button>
                                </div>
                            </Link>
                            <Link to="EditProfile">
                                <div id="eBtn">
                                    <button id="editTriBtn">Edit Info</button>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-1"></div>

                    </div>

                    {/*END OF PROFILE COLUMN*/}

                    <div className="col-sm-6">
                        <p id="list">My Lists</p>
                        {listInfo}
                        {this.renderRedirect()}
                    </div>
                </div>
            </div>
        );
  }
}



export default ProfilePage;
