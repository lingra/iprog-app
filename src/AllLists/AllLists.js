import React, {Component} from 'react';
import './AllLists.css';
import {modelInstance} from '../data/MovieModel';
import { Redirect } from 'react-router-dom';
import { database, getAllLists, getProfile } from '../firebase';

class AllLists extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            userLists: [],
            done: false
        }
    }
    
    componentDidMount() {
        this.ref = getAllLists();
        this.ref.on('value', snapshot => {
            this.setState({userLists: []});
            var allLists = snapshot.val();
            for (var key in allLists) {
                if (allLists.hasOwnProperty(key)) {
                    var listObj = {};
                    listObj.id = key;
                    listObj.author = allLists[key].author; //author is user uid and not name at this stage
                    listObj.title = allLists[key].title;
                    var moviesInList = JSON.parse(allLists[key].list);
                    listObj.posterMovie = moviesInList[0]; //posterMovie is id for the first movie in list at this stage
                    // get author username
                    this.getAuthor(listObj);
                }
            }
        })
    }

    componentWillUnmount() {
        this.ref.off();
        this.ref2.off();
    }
  
    displayAllLists = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var listObj = {};
                listObj.id = key;
                listObj.author = obj[key].author; //author is user uid and not name at this stage
                listObj.title = obj[key].title;
                var moviesInList = JSON.parse(obj[key].list);
                listObj.posterMovie = moviesInList[0]; //posterMovie is id for the first movie in list at this stage
                // get author username
                this.getAuthor(listObj);
            }
        }
    }
    
    getAuthor = (movieObj) => {
        this.ref2 = getProfile(movieObj.author);
        this.ref2.on('value', snapshot => {
            this.setAuthor(movieObj, snapshot.val().username);
        })
    }
    
    setAuthor = (obj, author) => {
        obj.author = author;
        // finally poster from api
        this.getListPoster(obj);
    }
    
    getListPoster = (movieObj) => {
        //Check if poster already set to avoid duplicates if user updates name
        var image = movieObj.posterMovie;
        // check if current img is an imdb id or not
        if (image.charAt(0) === "t") {
            modelInstance.getMovie(movieObj.posterMovie).then((movie) => {
                this.setPoster(movieObj, movie.Poster);
            }).catch(() => {
                this.setPoster(movieObj, "error");
            })
        }
    }
    
    setPoster = (obj, poster) => {
        //replace posterMovie movie id to actual img url
        obj.posterMovie = poster;
        this.state.userLists.push(obj);
        this.setState({
            status: 'INITIAL'
        });
    }
    
    visitList = (e) => {
        modelInstance.setActiveListCookie(e.target.id);
        this.redirect();
    }
    
    redirect = () =>  {
        this.setState({
            done: true
        });
    }
    
    renderRedirect = () => {
        // Redirect to fullscreen view of list
        if (this.state.done) {
            return <Redirect to='/fullscreen'></Redirect>
        }
    }
    
  render() {
      var movieList = "";
      
      movieList = this.state.userLists.map((list) => {
          var testImg;
          var posterImg = list.posterMovie;
          if (posterImg === 'N/A') {
              testImg = (<div className="listImgContainer">
                              <div id="imgWrapper">
                                 <div className="posterFill" id={list.id} onClick={(e) => this.visitList(e)}>
                                     <div className="posterTextFill" id={list.id} onClick={(e) => this.visitList(e)}>Poster not available</div>
                                  </div>
                              </div>
                           </div>);
          }
          else if (posterImg === 'error') {
              testImg = (<div className="listImgContainer">
                              <div id="imgWrapper">
                                 <div className="posterFill" id={list.id} onClick={(e) => this.visitList(e)}>
                                     <div className="apiErrMsg" id={list.id} onClick={(e) => this.visitList(e)}>Sorry! Unable to fetch poster from API.</div>
                                  </div>
                              </div>
                           </div>);
          }
          else {
              testImg = (<div className="listImgContainer">
                                <div id="imgWrapper">
                                    <img className="posterImg" src={posterImg} alt="Poster Img" id={list.id} onClick={(e) => this.visitList(e)}/>
                                 </div>
                           </div>)
          }
                                          
        return(<div className="col-sm-3" key={list.id}>
                    <div className="userListContainer">
                       {testImg}
                       <div className="listTextContainer">
                          <div className="titleText">{list.title}</div>
                          <div className="userText">By: <span id="listAuthor">{list.author}</span></div>
                      </div>
                    </div>
                </div>);
      });
      
        return(
            <div>
                {movieList}
                {this.renderRedirect()}
            </div>
        );
    }
}

export default AllLists;