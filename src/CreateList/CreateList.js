import React, {Component} from 'react';
import './CreateList.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import Movies from '../Movies/Movies';
import NewList from '../NewList/NewList';

class CreateList extends Component {

  constructor(props) {
        super(props);
        this.state = {
            movies: "",
        }; 
        this.searchInput = "";
    }
    
    componentDidMount() {
        var currentUser = modelInstance.getCookie("user");
        // Guest user, block interaction with page
        if (currentUser === "guest") {
            var showError = document.getElementById("loginErrorContainer");
            showError.style.display = 'block';
        }
        this.setState({
            status: 'INITIAL'
        });
    }
    
    componentDidUpdate() {
        //console.log("new", this.state.movies);
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
            console.log("Result from API", movies.Search);
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
  
  render() {
      var info;

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
        <div id="addListPage" class="nopadding">
            <div className="row">
                <div id="loginErrorContainer">
                    <p id="loginErrorTitle">Uh oh!</p>
                    <p id="loginErrorParagraph">How did you end up here? Only signed in users can create and edit lists.</p>
                </div>
                <div className="col-sm-4 nopadding" id="na">
                    <NewList/>
                </div>
                <div className="col-sm-8 nopadding" id="movieListDiv">
                    <input type="text" className="searchBar" placeholder="Search for movies here" onKeyPress={this._handleKeyPress}/>
                    <Link to="/main">
                        <span className="glyphicon glyphicon-home" id="home"></span>
                    </Link>
                    <div id="movieListDiv">
                        {info}
                        <Movies currentMovies = {this.state.movies} />
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default CreateList;