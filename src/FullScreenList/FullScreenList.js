import React, {Component} from 'react';
import './FullScreenList.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import { database, getList, getProfile, deleteMovieList } from '../firebase';

class ScreenList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            listTitle: "",
            movieList: [],
            status: "",
            done: false
        };
    }
    
    componentDidMount() {
        var currentList = modelInstance.getCookie("list");
        if (currentList) {
            this.getListFromDb(currentList);
        }
        this.setState({
            name: "",
            image: "",
            listTitle: "",
            movieList: [],
            status: "LOADING",
            done: false,
            to: ""
        })
    }
    
    componentWillUnmount() {
        this.ref.off();
        this.ref2.off();
        modelInstance.removeCookie("list");
    }
    
    getListFromDb = (listId) => {
        this.ref = getList(listId);
        this.ref.on('value', snapshot => {
            this.getAuthor(snapshot.val().author);
            this.displayTitle(snapshot.val().title);
            var listArray = JSON.parse(snapshot.val().list);
            this.getMoviesFromAPI(listArray);
        });
    }

    getAuthor = (author) => {
        this.ref2 = getProfile(author);
        this.ref2.on('value', snapshot => {
            this.displayAuthor(snapshot.val().username, snapshot.val().image);
        })
    }

    getMoviesFromAPI = (idArray) => {
        var arrayLength = idArray.length;
        var apiCallsRemaining = arrayLength;
        for (var i = 0; i < arrayLength; i++) {
            modelInstance.getMovie(idArray[i]).then((movie) => {
                var movieObj = {};
                movieObj.id = movie.imdbID;
                movieObj.title = movie.Title;
                movieObj.img = movie.Poster;
                movieObj.info = movie.Plot;
                this.state.movieList.push(movieObj);
                apiCallsRemaining -= 1;
                if (apiCallsRemaining <= 0) {
                    this.sortList(idArray);
                }
            }).catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
        }
    }
    
    sortList = (correctArray) => {
        var apiArray = this.state.movieList;
        var sortedArray = [];
        for (var item in correctArray) {
            for (var i in apiArray) {
                if (correctArray[item] === apiArray[i].id) {
                    sortedArray.push(apiArray[i]);
                }
            }
        }
        this.setState({
            movieList: sortedArray,
            status: 'DONE'
        });
    }
    
    displayAuthor = (username, img) => {
        this.setState({
            name: username,
            image: img
        });
    }
    
    displayTitle = (title) => {
        this.setState({
            listTitle: title
        })
    }
    
    alertError = (error) => {
        if (error.message) {
           alert("Something went wrong! Please try again! \n" + error.message); 
        } else {
            alert("Something went wrong! Please try again! \n");
        }
    }
    
    editList = () => {
        var currentList = modelInstance.getCookie("list");
        var currentMovies = [];
        for (var i = 0; i < this.state.movieList.length; i++) {
            var movieObj = {};
            movieObj.id = this.state.movieList[i].id;
            movieObj.title = this.state.movieList[i].title;
            currentMovies.push(movieObj);
        }
        var title = this.state.listTitle;
        var stringList = JSON.stringify(currentMovies);
        modelInstance.setListEditCookie(currentList, title, stringList);
        this.setState({
            to: "edit"
        });
        this.redirect();
    }
    
    removeList = () => {
        //Stop listening to database (to avoid display of errors)
        this.ref.off();
        this.ref2.off();
        
        // Get current list
        var currentList = modelInstance.getCookie("list");
        deleteMovieList(currentList);
        
        // Delete list
        modelInstance.removeCookie("list");
        this.setState({
            to: "delete"
        });
        this.redirect();
    }
    
    setMovie = (e) => {
        console.log("här i set movie");
        var currentList = modelInstance.getCookie("list");
        modelInstance.setActiveMovieCookie(e.target.id, currentList);
    }

    redirect = () =>  {
        this.setState({
            done: true
        });
    }
    
    renderRedirect = () => {
        // If done with list redirect back to main or fullscreen list
        if (this.state.done) {
            if (this.state.to === "edit") {
                return <Redirect to='/create'></Redirect>
            }
            else if (this.state.to === "delete") {
                return <Redirect to='/main'></Redirect>
            }
        }
    }
    

  render() {
      var author = <p id="author">{this.state.name}</p>;
      var img;
      var movieList;
      if (this.state.image !== "") {
          if (this.state.image === "Unknown") {
              img = (<div id="fs-fakeProfile">
                        <span id="fs-fakeUser" className="glyphicon glyphicon-user"></span>
                    </div>);
          } else {
              img = <img id="profilePic" alt="Your profile picture" src={this.state.image}/>;
          }
      }
      
      switch(this.state.status) {
          case 'LOADING':
              movieList = <img id="load" src="https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif"/>;
              break;
          case 'DONE':
              movieList = this.state.movieList.map((movie, index) => {
                  var movieImg = (<Link to="/viewMovie">
                                    <img className="img" id={movie.id} alt={movie.title} src={movie.img} onClick={(e) => this.setMovie(e)}/>
                                 </Link>);
                  var movieTitle = <p className="movieTitle" id={movie.id}>{movie.title}</p>;
                  var movieInfo = <p className="movieInfo">{movie.info}</p>;
                  var moviePlacement = index + 1;
          
              return (<div className="row">
                          <div className="col-sm-1">
                              <span id="movieNum">{moviePlacement}</span>
                          </div>
                          <div className="col-sm-2">
                            <table className="image">
                                <tbody>
                                    <tr>
                                        <td className="imgTdFs">
                                            {movieImg}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>
                          <div className="col-sm-9">
                              {movieTitle}
                              {movieInfo}
                          </div>
                      </div>);
                });
              break;
          case 'ERROR':
              movieList = (<div id="apiErrorContainer">
                              <div id="apiError">
                                 <p id="apiErrorTitle">Sorry!</p>
                                 <p id="apiErrorMsg">Something went wrong with the API. Please try again later!</p>
                              </div>
                           </div>);
              break;
      }
      
      return (
           <div className="container-fluid" id="fullscreenlistpage">
            <div className="row">
                <div className="col-sm-12">
                  <Link to="/main" id="titlelink">
                      <span className="glyphicon glyphicon-home" id="returnHome"></span>
                  </Link>
                </div>
            </div>
           
            <div className="row">
                <div className="row">
                    <div className="col-sm-3">
                        <div class="authContainer">
                            <span id="authTitle">Author:</span><br/>
                            <span id="imgContainer">{img}</span>
                            {author}
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <p className="listTitle">{this.state.listTitle}</p>
                        {movieList}
                    </div>
                    <div className="col-sm-2">
                        <button id="editBtn" onClick={() => this.editList()}>Edit</button>
                        <button id="editBtn" onClick={() => this.removeList()}>Remove</button>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        </div>
      );
  }
}

export default ScreenList;