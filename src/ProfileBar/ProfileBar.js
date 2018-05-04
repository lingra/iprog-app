import React, {Component} from 'react';
import './ProfileBar.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, toList, getUserID, getUserInfo, signOut, authentication } from "../firebase";


class ProfileBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            lists: "",
            fetching: false
        };
        this.unsubscribe;
    }
    
    componentDidMount() {
        console.log("Component did mount");
        this.emmastest()
    }
    
    emmastest = () => {
        console.log("I Emmas testfunktion");
        this.setState({
            name: "",
            image: "",
            fetching: true})
        
        this.unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    this.setUser(snapshot.val().username, snapshot.val().image);
                })
                console.log("hämtat data")
            } else {
                this.setState({
                    name: "You must login to see your profile"
                });
                console.log("Ingen inloggad");
            }
        });
    }
    
    componentWillUnmount() {
        this.ref.off()
        this.unsubscribe();
    }
    
    setUser(userName, userPic) {
        this.setState({
            name: userName,
            image: userPic,
            fetching: false
        })
    }

/*
    componentDidMount() {
        this.setState({fetching: true});
        console.log(database);
        this.ref = database.ref('users/');
        console.log("getUserID", getUserID());
        console.log("getUserInfo", getUserInfo());
        var userinfo = getUserInfo();
        console.log("typeof", typeof(userinfo));
        console.log(database.ref('users/'));
        
        this.setstate({
            name: userinfo.
        })
        
        this.ref.on('value', snapshot => {
            this.mapToBuildings( database.toList(snapshot.val()))
        })
    }

      getLists(lists) {
          if (lists === undefined)
              return undefined;
          return lists.map(movie =>
                <li key={lists.key}>
                    <Link className='movie' to={`/lists/${movie.key}`}>
                        {movie.title}
                    </Link>
                </li>
            );
      }

      mapToLists(lists) {
        this.setState({
          lists: lists.filter(movie => movie !== undefined).sort(),
          fetching: false
        })
      }
      */
          
  render() {
                         
      var listname = "";
      var loginbutton = "";
      
      return (
          <div id="ProfileBar">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="profileInfo">
                        <img id="profilePic" alt="Your profile pic" src={this.state.image}></img>
                        <p id="profileName">{this.state.name}</p>
                    </div>
                </div>
                <div className="col-sm-1"></div>
              </div>  

              <div className="row">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                      <p>My Lists</p>
                      <div>
                          {listname}
                      </div>
                      <div>
                          <Link to="/">
                              <span className="glyphicon glyphicon-plus"></span><p id="add-list-profile"> Add List</p> 
                          </Link>
                      </div>
                  </div>
                  <div className="col-sm-1"></div>
              </div>
            </div>
      );
  }
}

export default ProfileBar;
