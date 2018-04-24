import React, {Component} from 'react';
import './MyLists.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';


class MyLists extends Component {

  render() {
      movieItems = "";
            /*movieList = this.state.movies.map((movie) => 
            <div className="col-sm-6" key={movie.imdbID}>
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
      
      /*movieItems += ADDLISTDIVBUTTON */
      
      return (
        <div id="MyListsPage">
            <div class="row">          
                <div class="col-sm-12">
                    {movieItems}
                </div>
            </div>
        </div>
      );
  }
}

export default MyLists;

