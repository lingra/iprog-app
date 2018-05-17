import React, {Component} from 'react';
import './ProfilePage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import listImg from "../images/gradients1.jpg";
import { database, getUserLists, getProfile, getList } from "../firebase";


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
            list: []
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
            fSnack: ""
        })
        
        var currentUser = modelInstance.getCookie();
        this.ref = getProfile(currentUser);
        this.ref2 = getUserLists(currentUser);
        if (currentUser !== "guest") {
            this.ref.on('value', snapshot => {
                this.setUser(snapshot.val().username, snapshot.val().image, snapshot.val().favgenre, snapshot.val().favline, snapshot.val().favmovie, snapshot.val().favactor, snapshot.val().favsnack);
            })
            this.ref2.on('value', snapshot => {
                this.displayLists(snapshot.val());
            })
        } else {
            console.log("hej du har kommit fel");
            this.setState({
                status: 'ANONYMOUS'
            })
        };
    }
    
    componentWillUnmount() {
        this.ref.off()
        this.ref2.off()
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
            fetching: false,
            status: 'USER'
        })
    }
    
    /*
    displayLists(obj) {     listImg
        var lists = [];
        for (var key in obj) {
            var listobj = {};
            listobj.listId = key;
            
            var listSpec = obj[key];
            for (var item in listSpec) {
                if (item === "title") {
                    listobj.title = listSpec[item];
                    lists.push(listobj);
                }
            }
        }
        this.setState({
            lists: lists
        });
        console.log("statet", this.state.lists);
    }
    */
    

    displayLists(obj) {
        for (var key in obj) {
            var id = JSON.parse(obj[key]["list"])[0];
            this.getMovieInfo(obj, key, id);
        }
        console.log("statelist", this.state.list);
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
    
    render() {
        var profileNm;
        var profileImg;
        var fullList;
        var listInfo;

        
        switch (this.state.status) {
            case 'USER':
                profileNm = <p id="profileNm">{this.state.name}</p>;
                
                profileImg = <img id="profilePic" alt="Your profile pic" src={this.state.image}></img>;
                
                fullList = this.state.list.map((item) => {
                        return (<div className="col-sm-4 container" key="listId">
                                <Link to="/fullscreen">
                                    <img src={item.image} alt="my list" id="imgTd"></img>
                                    <div className="profileListItem" id="bottom-center" >
                                        {item.title}
                                    </div>
                                </Link>
                            </div>);
                });
                
                listInfo = (<div id="profileLists">
                                {fullList}
                            </div>);

              break;
                
            case 'ANONYMOUS':
                console.log("Du är inte inloggad");
                break;
        }
        
        
        
        return (
            <div id="ProfilePage">
            <div className="row" id="header">
                <div className="col-sm-8">
                    <Link to="/main" id="titlelink">
                        <span className="glyphicon glyphicon-home" id="returnHome"></span>
                    </Link>
                </div>
                <div className="col-sm-4">
                    <p id="webpage-title">M(yFave)Db</p>
                </div>
            </div>
              
            <div className="row">
                <div className="col-sm-6">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-8 profileInfo">
                        {profileImg}
                        <h3 id="profileNm">{profileNm}</h3>
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
                </div>
            </div>
        </div>
      );
  }
}

export default ProfilePage;
