import React, {Component} from 'react';
import './ProfileBar.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import { database, getProfile, getUserLists } from "../firebase";


class ProfileBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            lists: [],
            status: "",
            //fetching: false
        };
        this.unsubscribe;
    }
    
    componentDidMount() {
        this.setState({
            name: "",
            image: "",
            //fetching: true
        })
        
        var currentUser = modelInstance.getCookie();
        console.log("cu", currentUser);
        this.ref = getProfile(currentUser);
        this.ref2 = getUserLists(currentUser);
        if (currentUser !== "guest") {
            this.ref.on('value', snapshot => {
                this.setUser(snapshot.val().username, snapshot.val().image);
            })
            this.ref2.on('value', snapshot => {
                this.displayLists(snapshot.val());
            })
        } else {
            this.setState({
                status: 'ANONYMOUS'
            });
        }
        
        //Attach listener to unsubscribe, so that we can stop listening when component unmounts
        /*
        this.unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    try {
                        this.setUser(snapshot.val().username, snapshot.val().image);
                    }
                    catch (e) {
                        // If username and img not set in firebase
                        this.setUser("", "");
                    }
                });
                console.log("hämtat data")
            } else {
                this.setState({
                    status: 'ANONYMOUS'
                });
                console.log("Ingen inloggad");
            }
        }); */
    }
  
    componentWillUnmount() {
        this.ref.off()
        this.ref2.off()
        //this.unsubscribe(); //Stop listening to user
    }
    
    displayLists(obj) {
        var lists = [];
        for (var key in obj) {
            var listobj = {};
            listobj.listId = key;
            
            var listSpec = obj[key];
            for (var item in listSpec) {
                if (item === "title") {
                    listobj.title = listSpec[item];
                    lists.push(listobj);
                }
            }
        }
        this.setState({
            lists: lists
        });
        console.log("statet", this.state.lists);
    }
    
    setUser(userName, userPic) {
        this.setState({
            name: userName,
            image: userPic,
            status: 'USER',
            //fetching: false
        })
    }
          
  render() {
      var profileImg;
      var profileNm;
      var listInfo;
      var profileInf;
      var fullList;
      var listItem;
      
      switch (this.state.status) {
          case 'USER':
            if (this.state.name != "" && this.state.image != "Unknown") {
                profileImg = <img id="profilePic" alt="Your profile picture" src={this.state.image}/>
                profileNm = (<Link to="/profile" style={{textDecoration:'none'}}>
                            <p id="profileName">{this.state.name}</p>
                        </Link>);
            } else {
                profileImg = (<div id="fakeProfile">
                                <span id="fakeUser" class="glyphicon glyphicon-user"></span>
                              </div>);
                profileNm = (<Link to="/profile" style={{textDecoration:'none'}}>
                                <p id="profileName">{this.state.name}</p>
                            </Link>);
                profileInf =  (<div>
                               <p id="#profileInf">To set your profile image - click on your username to go to your profile and edit.</p>
                               </div>);
            }
            fullList = this.state.lists.map((item) => {
                return <div className="profileListItem" id={item.listId}>{item.title}</div>;
            });
            listInfo = (<div>
                            <span class="glyphicon glyphicon-list"></span><span id="title"> My lists</span>
                             
                            <div id="profileLists">
                                {fullList}
                            </div>
                            <div>
                                <Link to="/create">
                                    <span className="glyphicon glyphicon-plus"></span><span id="title"> Add list</span> 
                                </Link>
                            </div>
                           </div>);
              break;
              
          case 'ANONYMOUS':
              profileImg = (<div id="fakeProfile">
                                <span id="fakeUser" class="glyphicon glyphicon-user"></span>
                            </div>);
              profileNm = <p id="loginWarning">You must sign in to view your profile.</p>;
              profileInf = "";
              break;
      }
      
      return (
          <div id="ProfileBar">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="profileInfo">
                        {profileImg}
                        {profileNm}
                        {profileInf}
                    </div>
                </div>
                <div className="col-sm-1"></div>
              </div>  

              <div className="row">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                      {listInfo}
                  </div>
                  <div className="col-sm-1"></div>
              </div>
            </div>
      );
  }
}

export default ProfileBar;
