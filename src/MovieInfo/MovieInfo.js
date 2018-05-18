import React, {Component} from 'react';
import './MovieInfo.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';

class MovieInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            movieSpecs: [],
            fromList: ""
        };
    }
    
    componentDidMount() {
        var currentMovie = modelInstance.getCookie("movie");
        if (currentMovie) {
            this.getMovieFromAPI(currentMovie.movie);
            this.setState({
                fromList: currentMovie.fromList
            });
        }
        this.setState({
            status: 'LOADING',
        });
    }
    
    componentWillUnmount() {
        modelInstance.setActiveListCookie(this.state.fromList);
        modelInstance.removeCookie("movie");
    }
    
    getMovieFromAPI = (movieId) => {
        modelInstance.getMovie(movieId).then((movie) => {
            var movieObj = {};
            movieObj.title = movie.Title;
            movieObj.year = movie.Year;
            movieObj.runtime = movie.Runtime;
            movieObj.rated = movie.Rated;
            movieObj.director = movie.Director;
            movieObj.actors = movie.Actors;
            movieObj.plot = movie.Plot;
            movieObj.poster = movie.Poster;
            movieObj.score = movie.imdbRating;
            this.state.movieSpecs.push(movieObj);
            this.setState({
                status: 'DONE'
            })
        }).catch(() => {
                this.setState({
                    status: 'ERROR'
                });
            });
    }
    
  render() {
      var movie;
      
      switch(this.state.status) {
          case 'LOADING':
              movie = <img id="load" src="https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif"/>;
              break;
          case 'DONE':
              movie = this.state.movieSpecs.map((movie) => {
          
              return (<div className="row" key={movie.title}>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div id="posterContainer">
                                        <img className="poster" alt={movie.title} src={movie.poster}/>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div id="descContainer">
                                        <div id="movieTitle">{movie.title}</div>
                                        <div id="movieSpecs">
                                            Released: <span id="movieinf">{movie.year}</span><br/>
                                            Runtime: <span id="movieinf">{movie.runtime}</span><br/>
                                            Rated: <span id="movieinf">{movie.rated}</span><br/>
                                            <p id="movieplotP">Plot: <span id="moviePlot">{movie.plot}</span></p>
                                            Director: <span id="movieinf">{movie.director}</span><br/>
                                            Actors: <span id="movieinf">{movie.actors}</span><br/>
                                            imDb Score (out of 10): <span id="movieinf">{movie.score}</span><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                      </div>);
                });
              break;
          case 'ERROR':
              movie = (<div id="apiErrorContainer">
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
                  <Link to="/fullscreen" id="titlelink">
                      <span className="glyphicon glyphicon-arrow-left" id="returnHome"></span>
                  </Link>
                </div>
            </div>
           
            <div className="row">
                {movie}
            </div>
        </div>
      ); 
  }
}

export default MovieInfo;