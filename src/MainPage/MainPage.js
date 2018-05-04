import React, {Component} from 'react';
import './MainPage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import Movies from '../Movies/Movies';
import ProfileBar from '../ProfileBar/ProfileBar';
import { database, signOut } from "../firebase";

class MainPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: ""
        }; 
        this.searchInput = "";
    }
    
    componentDidMount() {
        /* DO SOMETHING ELSE HERE, INSTEAD OF SHOWING MOVIES IMMEDIATELY?*/
        /*
        modelInstance.getAllMovies(this.searchInput).then(movies => {
            console.log("Result from API", movies.Search);
            this.setState({
                movies: movies.Search
            })
        }).catch(() => {
        }) */
    }
    
    componentDidUpdate() {
        console.log("new", this.state.movies);
    }
    
    handleKeywordChange = (event) => {
        // Set current input
        var currentInput = event.target.value;
        this.searchInput = currentInput;
    }
    
    submitKeyword = () => {
        // Submit current input to retrieve API
        modelInstance.getAllMovies(this.searchInput).then(movies => {
            console.log("Result from API", movies.Search);
            this.setState({
                movies: movies.Search
            })
        }).catch(() => {
        })
    }
    
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleKeywordChange(e);
            this.submitKeyword();
        }
    }
    
    signOutUser = () => {
        console.log("In signOutUser");
        signOut();
    }
    
    
  render() {     
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
                        <button onClick={() => this.signOutUser()} className="signOutBtn">Sign out</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 nopadding" id="movieListDiv">
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