import React, {Component} from 'react';
import './FullScreenList.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { database, getList, getProfile } from '../firebase';
=======
>>>>>>> 855302a5816c346668928e54d6ecdda59c69eb1b
import listimg from "../images/gradients2.jpg";


class ScreenList extends Component {
<<<<<<< HEAD
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            listTitle: "",
            movieList: [],
            status: "LOADING"
        };
    }
    
    componentDidMount() {
        this.getListFromDb('-LCTQGMLb_En_uarBhtH');
        this.setState({
            name: "",
            image: "",
            listTitle: "",
            movieList: [],
            status: "LOADING"
        })
        this.movieList = [];
    }
    
    componentWillUnmount() {
        this.ref.off();
        this.ref2.off();
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
        for (var i = 0; i < arrayLength; i++){
            var currentMovie = modelInstance.getMovie(idArray[i]).then(movie => {
                this.storeMovie(movie.imdbID, movie.Title, movie.Poster, movie.Plot);
            });
        }
        this.setState({
            status: "DONE"
        });
    }
    
    storeMovie = (id, title, poster, plot) => {
        var movieObj = {};
        movieObj.id = id;
        movieObj.title = title;
        movieObj.img = poster;
        movieObj.info = plot;
        this.state.movieList.push(movieObj);
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
                  var movieImg = <img className="img" draggable="false" alt="MovieImg" src={movie.img}/>;
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
      }
=======

  render() {
      
      var test = (<div className="row">
                      <div className="col-sm-1">
                          <span id="movieNum">1</span>
                      </div>
                      <div className="col-sm-3">
                        <table className="image">
                            <tbody>
                                <tr>
                                    <td className="imgTdFs">
                                        <img className="img" draggable="false" alt="hej" src={listimg}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                      <div className="col-sm-8">
                          3
                      </div>
                  </div>);
>>>>>>> 855302a5816c346668928e54d6ecdda59c69eb1b
      
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
<<<<<<< HEAD
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
=======
                        Author:
                        Name
                    </div>
                    <div className="col-sm-8">
                        <p className="pagetitle">My List</p>
                        {test}
                    </div>
                    <div className="col-sm-1">
>>>>>>> 855302a5816c346668928e54d6ecdda59c69eb1b
                        Edit
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default ScreenList;

