import React, {Component} from 'react';
import './ProfileBar.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import { database, getProfilePic, getUsername, getUserLists } from "../firebase";


class ProfileBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            lists: [],
            status: "",
            visit: false
        };
    }
    
    componentDidMount() {
        this.setState({
            name: "",
            image: "",
            visit: false
        })
        
        var currentUser = modelInstance.getCookie("user");
        
        this.ref1 = getUsername(currentUser);
        this.ref2 = getProfilePic(currentUser);
        this.ref3 = getUserLists(currentUser);
        if (currentUser) {
            if (currentUser !== "guest") {
                this.ref1.on('value', snapshot => {
                    this.setUsername(snapshot.val());
                })
                this.ref2.on('value', snapshot => {
                    this.setProfilePic(snapshot.val());
                });
                this.ref3.on('value', snapshot => {
                    this.displayLists(snapshot.val());
                })
            } else {
                this.setState({
                    status: 'ANONYMOUS'
                });
            }
        }
    }
  
    componentWillUnmount() {
        this.ref1.off()
        this.ref2.off()
        this.ref3.off()
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
    }
    
    setUsername(username) {
        this.setState({
            name: username,
            status: 'USER'
        });
    }
    
    setProfilePic(img) {
        this.setState({
            image: img
        });
    }
    
    /*
    setUser(userName, userPic) {
        this.setState({
            name: userName,
            image: userPic,
            status: 'USER',
        })
    }
    */
    
    fullscreenList = (e) => {
        modelInstance.removeCookie("list");
        modelInstance.setActiveListCookie(e.target.id);
        this.redirect();
    }
    
    redirect = () => {
        this.setState({
            visit: true
        });
    }
    
    renderRedirect = () => {
        // If visit list true redirect to fullscreen
        if (this.state.visit) {
            return <Redirect to='/fullscreen'></Redirect>
        }
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
                return <div className="profileListItem" onClick={(e) => this.fullscreenList(e)} id={item.listId}>{item.title}</div>;
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
                  {this.renderRedirect()}
              </div>
            </div>
      );
  }
}

export default ProfileBar;