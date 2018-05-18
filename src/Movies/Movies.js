import React, {Component} from 'react';
import './Movies.css';

class Movies extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            currentMovies: ''
        }
    }
    
    componentDidMount() {
        this.setState({
            status: 'INITIAL'
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentMovies != '') {
            this.setState({
                status: 'RESULT',
                currentMovies: nextProps.currentMovies
            });
        } else {
            this.setState({
                status: 'INITIAL'
            });
        }
    }
    
    // Function for what we do when one drags a movie
    onDragStart = (e) => {
        e.dataTransfer.dropEffect = "move";
        var movieObj = {'title': e.target.title, 'id': e.target.id, 'type': "movie"};
        var objToTransf = JSON.stringify(movieObj);
        e.dataTransfer.setData("text/plain", objToTransf);
    }
    
  render() {
      var movieList;

      switch (this.state.status) {
          case 'INITIAL':
              movieList = "";
              break;
              
          case 'RESULT':
            movieList = this.state.currentMovies.map((movie) => {
                var posterImg;
                if (movie.Poster === 'N/A') {
                    posterImg = <div className="imgMissing"><p id="postTitle">Poster not available</p></div>;
                } else {
                    posterImg = <img className="img" draggable="false" alt={movie.Title} src={movie.Poster}/>;
                }
                return (
                    <div className="col-sm-3 movieContainer" draggable="true" data-appendto="movie" onDragStart={(e) => this.onDragStart(e, this)} title={movie.Title} id={movie.imdbID} key={movie.imdbID}>
                        <table className="image">
                            <tbody>
                                <tr>
                                    <td className="imgTd">
                                        {posterImg}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p id="movTitle">{movie.Title}</p>
                    </div>)
            });

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