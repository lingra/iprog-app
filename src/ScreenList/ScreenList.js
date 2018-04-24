import React, {Component} from 'react';
import './ScreenList.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class ScreenList extends Component {

  render() {
      var MovieList = "";
      var ListTitle = "";
      /*movieList = this.state.movies.map((movie) => 
            <div className="col-sm-4 dishContainer" key={movie.imdbID}>
              <table className="image">
                <tbody>
                  <tr>
                    <td className="imgTd">
                        <img className="img" alt={movie.Title} src={movie.Poster} />
                    /td>
                  </tr>
                  <tr>
                    <td>
                        {movie.Title}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>);
            */
      
      
      return (
          <div id="listViewPage">
              <div className="row" id="header">
                  <div className="col-sm-8"></div>
                  <div className="col-sm-4">
                      <p id="webpage-title">M(yFave)Db</p>
                  </div>
              </div>
              <div class="row">
                  <div id="ListTitle">
                      {ListTitle}
                  </div>
                  <div class="col-sm-4"></div>
                  <div class="col-sm-4" id="MovieDiv">
                      {MovieList}
                  </div>
                  <div class="col-sm-4"></div>
                  <Link to="main">
                      <button id="removeBtn">Sign up!</button>
                  </Link>
            </div>
        </div>
      );
  }
}

export default ScreenList;

