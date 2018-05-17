import React, {Component} from 'react';
import './MainPage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import Movies from '../Movies/Movies';
import ProfileBar from '../ProfileBar/ProfileBar';
import { database } from "../firebase";
import { signOut } from "../auth";

class MainPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: "",
            user: ""
        }; 
        this.searchInput = "";
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
    
    handleKeywordChange = (event) => {
        // Set current input
        var currentInput = event.target.value;
        this.searchInput = currentInput;
    }
    
    submitKeyword = () => {
        this.setState({
            status: 'LOADING',
            movies: ''
        })
        // Submit current input to retrieve API
        modelInstance.getAllMovies(this.searchInput).then(movies => {
            this.setState({
                status: 'DONE',
                movies: movies.Search
            })
        }).catch(() => {
            this.setState({
                status: 'ERROR'
            });
        })
    }
    
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleKeywordChange(e);
            
            var currentInput = this.searchInput.trim()
            if (currentInput) {
                this.submitKeyword();
            }
        }
    }
    
    signOutUser = () => {
        console.log("sign out");
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

      switch (this.state.status) {
          case 'INITIAL':
              info = (<div class="startInfoContainer">
                        <span id="searchImg" class="glyphicon glyphicon-search"></span>
                        <span id="searchImg" class="glyphicon glyphicon-film"></span>
                        <p id="startInfo">Get started by searching for a<br/> movie title or theme.</p>
                      </div>);
              break;
              
          case 'LOADING':
              info = <img id="loadImg" src="https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif"/>;
              break;
              
          case 'DONE':
              info = "";
              break;
          case 'ERROR':
              info = (<div id="apiErrorContainer">
                        <div id="apiError">
                           <p id="apiErrorTitle">Sorry!</p>
                           <p id="apiErrorMsg">Something went wrong with the API. Please try again later!</p>
                        </div>
                      </div>);
              break;
      }
      
      return (
        <div id="mainpage" class="nopadding">
            <div className="row nopadding" id="header">
            <div className="col-sm-5 nopadding">
                <input type="text" className="searchBar" placeholder="Search for movies here" onKeyPress={this._handleKeyPress}/>
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
                <div className="col-sm-8 nopadding" id="movieListDiv">
                    {info}
                    <Movies currentMovies = {this.state.movies} />
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