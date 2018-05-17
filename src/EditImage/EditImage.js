import React, {Component} from 'react';
import './EditImage.css';
import {modelInstance} from '../data/MovieModel';
import { Link, Redirect } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, getProfilePic, editProfilePic } from "../firebase";

class EditImage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userImage: "",
            status: 'NOTLOGGEDIN'
        };
    }
    
    componentDidMount() {
        var currentUser = modelInstance.getCookie("user");
        if (currentUser !== "guest") {
            this.ref = getProfilePic(currentUser);
            this.ref.on('value', snapshot => {
                this.setUser(snapshot.val());
                this.setState({
                    status:'USER'
                });
            })  
        } else {
            var showError = document.getElementById("loginErrorContainer");
            showError.style.display = 'block';
            this.setState({
                status: 'NOTLOGGEDIN'
            })
        }
    }
    
    componentWillUnmount() {
        this.ref.off()
    }

    setUser(userImage) {
        this.setState({
            userImage: userImage
        })
    }
    
    redirect = () => {
        this.setState({
            done: true,
            errorMsg: ""
        });
    }
    
    renderRedirect = () => {
        // If login ok redirect to main
        if (this.state.done) {
            return <Redirect to='/profile'></Redirect>
        }
    }
    
    getChangedInfo = () => {
        var imageURL;
        // If you haven't tried anything --> take from form
        if (this.state.userImage == "") {
            console.log("1");
            imageURL = document.getElementById("imageURL").value;
            
            // If you have tried but chose another pic --> take from form
        } else if (this.state.userImage != document.getElementById("imageURL").value) {
            console.log("2");
            imageURL = document.getElementById("imageURL").value;
            
            // If you tried and was happy with your choice --> take from form
        } else {
            console.log("3");
            imageURL = document.getElementById("imageURL").value;
        }
        
            editProfilePic(imageURL);
            this.redirect();
    }
    
    tryImage() {
        var imageURL = document.getElementById("imageURL").value;
        if (imageURL != ""){
            this.setState({
                userImage: imageURL,
                saveBtn: "tried"
            })
        }
    }
  
    /*updateImage = (e) => {
        this.setState({
            userImage: e.target.value
        })
    }*/


  render() {
      var image = this.state.userImage;
      switch (this.state.status) {
          case 'USER':
              if (this.state.userImage != 'Unknown') {
                  image = <img src={this.state.userImage} id="profilePic" alt="Some profile Pic" />;
                  
              } else {
                  image = (<div id="fakeProfile">
                                <span id="fakeUser" className="glyphicon glyphicon-user"></span>
                            </div>);
              }
              break;
      }
      
      
      return (
        <div id="EditProfilePage">
            <div className="row">
                <div id="loginErrorContainer">
                    <p id="loginErrorTitle">Uh oh!</p>
                    <p id="loginErrorParagraph">How did you end up here? Only signed in users can edit their profile image.</p>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <Link to="/profile" id="goToProfile">
                            <span className="glyphicon glyphicon-arrow-left" id="goToProfile"></span>
                        </Link>
                    </div>
                    <p id="webpage-title">Edit Image</p>
                </div>
                
                <div className="col-sm-3">
                </div>
                <div className="col-sm-6" id="formDiv">
                    {image}
                    <p id="formText">URL</p>
                    <input id="userImage" className="formInput" id="imageURL" type="text" />
                    
                    <p id="formText">Please check that your image works before submiting</p>
                     
                    <button id="SubmitImgBtn" onClick={() => this.tryImage()}>Try it out</button>
                    
                    <button id="ToProfileBtn" onClick={() => this.getChangedInfo()}>Save</button>
                    
                    {this.renderRedirect()}
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
      );
  }
}

export default EditImage;

