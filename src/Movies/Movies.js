import React, {Component} from 'react';
import './Movies.css';
import { Link } from 'react-router-dom';

class Movies extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            currentMovies: ''
        }
    }
    
    componentDidMount() {
        console.log(this.state.status);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("Movie receive props, ", nextProps.currentMovies);
        this.setState({
            status: 'SEARCHRESULT',
            currentMovies: nextProps.currentMovies
        })
    }
    
  render() {
      var movieList;

      switch (this.state.status) {
          case 'INITIAL':
              movieList = "";
              break;
          case 'SEARCHRESULT':
            movieList = this.state.currentMovies.map((movie) => 
                <div className="col-sm-3 dishContainer" key={movie.imdbID}>
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
        return(
            <div>
                {movieList}
            </div>
        );
    }
}

export default Movies;