import React, {Component} from 'react';
import './Main.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keyword: "house",
            movies: "",
            state: 'SEARCH'
        }   
        this.searchInput = "";
    }

    componentDidMount() {
        modelInstance.getAllMovies(this.state.keyword).then(allMovies => {
            console.log("state");
            console.log(allMovies.Search);
            this.setState({
                status: 'SEARCH',
                movies: allMovies.Search
            })
        }).catch(() => {
            this.setState({
                status: 'ERROR'
            })
        })
    }
    
    handleKeywordChange = (event) => {
        // Set current input
        var currentInput = event.target.value;
        this.searchInput = currentInput;
    }
    
    submitKeyword = () => {
        // Submit current input with state change at click of search button
        this.setState ({
            keyword: this.searchInput
        });
    }
    
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("enter");
            console.log(this.state.keyword);
            this.handleKeywordChange(e);
            this.submitKeyword();
            console.log("keyword");
            console.log(this.state.keyword);
        }
    }

    
    
  render() {
      var movieList;
      
      switch (this.state.status) {
          case 'DEFAULT':
              movieList = "";
              break;
          case 'SEARCH':
              movieList = this.state.movies.map((movie) => 
                <div className="col-sm-4 dishContainer" key={movie.imdbID}>
                  <table className="image">
                    <tbody>
                      <tr>
                        <td className="imgTd">
                            <img className="img" alt={movie.Title} src={movie.Poster} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>);
            break;
        case 'ERROR':
                break;
                                                
      }
                                                
      return (
        <div className="container-fluid" id="mainpage">
            <div className="row" id="header">
            <div className="col-sm-8">
                <input type="text" className="searchBar" placeholder="Search for movies here" onKeyPress={this._handleKeyPress}/>
            </div>
                <div className="col-sm-4">
                    <p id="webpage-title">M(yFave)Db</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">{movieList}</div>
                <div className="col-sm-4" id="profilebar"></div>
            </div>
        </div>
      );
  }
}

export default Main;

