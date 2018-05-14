import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './NewList.css';
import { database, saveMovieList } from "../firebase";

class NewList extends Component {

  constructor(props) {
        super(props);
        this.state = {
            msg: "",
            movieList: [],
            done: false
        }; 
    }

    componentDidMount() {
        this.setState({
            msg: "",
            done: false
        });
    }
    
    redirect = () => {
        this.setState({
            done: true
        });
    }
    
    saveList = () => {
        var listTitle = document.getElementById("listTitle").value;
        var currentList = this.state.movieList;
        var listToSave = [];
        for (var i = 0; i < currentList.length; i++) {
            var movieId = currentList[i].id;
            listToSave.push(movieId);
        }
        var currentUser = localStorage.getItem('currentUser');
        var userId = currentUser;
        var listData = {
            author: userId,
            title: listTitle,
            list: JSON.stringify(listToSave)
        }
        var redirect = this.redirect();
        saveMovieList(listData).then(function(redirect){}).catch(function(error){
            alert("Something went wrong! Please try again later! \n" + error);
        });
    }
    
    redirect = () =>  {
        this.setState({
            done: true
        });
    }
    
    renderRedirect = () => {
        // If done with list redirect back to main
        if (this.state.done) {
            return <Redirect to='/main'></Redirect>
        }
    }

    onListDragStart = (e) => {
        // Function for switching item in list
        e.dataTransfer.dropEffect = "move";
        // Add type to secure from faulty dragdrop
        var movieObj = {'title': e.target.innerText, 'id': e.target.id, 'type': "list"};
        var objToTransf = JSON.stringify(movieObj);
        e.dataTransfer.setData("text/plain", objToTransf);
    }
    
    handler = e => {
        e.preventDefault();
    }

    onDropNewMovie = e => {
        // Function for when user drops a new movie to add to list
        const data = e.dataTransfer.getData("text");
        var movieObj = JSON.parse(data);
        // Check object type, only movies adding to list should have type movie
        if (movieObj.type === "movie") {
            // Remove key type, not necessary beyond this point
            delete movieObj.type;
            
            // Check if movie already in list
            var result = this.isMovieInListAlready(movieObj.id);
            if (result == false) {
                let {movieList} = this.state;
                movieList.push(movieObj);
                
                // Force rerender after new item pushed to array
                this.setState({ 
                    movieList,
                    msg: ""
                    });
            } else {
                this.setState({
                    msg: <div id="msg"><span class="glyphicon glyphicon-comment"></span><span> You have already added this movie to your list!</span></div>
                });
            }
        }
    }
    
    onListDropChange = e => {
        // Function for switching places in list
        const data = e.dataTransfer.getData("text");
        var movieObj = JSON.parse(data);
        if (movieObj.type === "list") {
            var droppedMovieIndex = this.getIndexOfObject(movieObj.id);
            var currentMovieIndex = this.getIndexOfObject(e.target.id);
            let {movieList} = this.state;
            // Remove movie from its former place in array
            movieList.splice(droppedMovieIndex, 1);
            // Add movie to array at current index where it dropped
            movieList.splice(currentMovieIndex, 0, movieObj);
            // Force rerender after new item pushed to array
            this.setState({ movieList });
        }
    }

    getIndexOfObject = (movieId) => {
        var list = this.state.movieList;
        for (var i = 0; i < list.length; i++) {
            if (this.state.movieList[i]['id'] === movieId) {
                return i;
            }
        }
    }
    
    isMovieInListAlready = (movieId) => {
        var list = this.state.movieList;
        for (var i = 0; i < list.length; i++) {
            if (this.state.movieList[i]['id'] === movieId) {
                return true;
            }
        }
        return false;
    }
    
    removeFromList = (e) => {
        var index = this.getIndexOfObject(e.target.parentNode.id);
        let {movieList} = this.state;
        // Remove movie from array
        movieList.splice(index, 1);
        this.setState({ movieList });
    }
    
    render() {
     return (      
        <div>
            <input type="text" className="setListName" id="listTitle" placeholder="Set your list name here" onDrop={(e) => this.handler(e)} onDragOver={(e) => this.handler(e)}/>

            <div className="addContainer">
                <div id="addMovie" data-boxtype="movie" onDragOver={(e) => this.handler(e)} onDrop={this.onDropNewMovie}>Add a movie to your list by dropping it here!</div>
                {this.state.msg}
            </div>
            <div id="movieList">
                <ol>
                {
                    this.state.movieList.map(item => {
                        return <li className="movieInList" id={item.id} onDragStart={(e) => this.onListDragStart(e, this)} onDragOver={(e) => this.handler(e)} onDrop={this.onListDropChange} draggable>
                                <input class="listItem" value={this.state.movieList.indexOf(item) + 1} disabled/>
                                {item.title}
                                <span id="removeIcon" onClick={(e) => this.removeFromList(e)} className="glyphicon glyphicon-remove"></span>
                               </li>
                            })
                        }
                </ol>
            </div>
            <div className="addContainer">
                <button id="saveList" onClick={() => this.saveList()}>Save!</button>
            </div>
            {this.renderRedirect()}
        </div>);
    }   
}

export default NewList;