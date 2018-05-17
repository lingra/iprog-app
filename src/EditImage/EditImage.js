import React, {Component} from 'react';
import './EditImage.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import profileImg from "../images/gradients1.jpg";
import { database, getUserID, getUserInfo, authentication, editProfile, editProfilePic } from "../firebase";

class EditImage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
        this.unsubscribe();
    }
    
    componentDidMount() {
        this.setState({
            userImage: ""
        })
    }
    
    componentWillUnmount() {
        this.ref.off()
        this.unsubscribe(); //Stop listening to user
    }

    unsubscribe = () => authentication.onAuthStateChanged((user) => {
            if (user) {
                var currentUser = user.uid;
                this.ref = database.ref('users/' + currentUser);
                this.ref.on('value', snapshot => {
                    this.setUser(snapshot.val().image);
                })
                console.log("hämtat data")
            } else {
                console.log("Ingen inloggad");
            }
        });

    setUser(userImage) {
        this.setState({
            userImage: userImage
        })
    }
    
    getChangedInfo = () => {
        var userImage = document.getElementById("userImage").value;
        editProfilePic(userImage);
        userImage = "";
    }
    

  render() {
      var image = this.state.userImage;
      
      return (
        <div id="EditProfilePage">
            <div className="row" id="header2">
                &#10006;
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <p id="webpage-title">M(yFave)Db</p>
                </Link>
                
                <div className="col-sm-3"></div>
                <div className="col-sm-6" id="formDiv">
                    <img src={image} id="profilePic" alt="Some profile Pic" />
                    <p id="formText">URL</p>
                    <input id="userImage" className="formInput" type="text" />
                        
                    <p id="formText">Please check that your image works before submiting</p>
                    
                    <button onClick={() => this.getChangedInfo()} id="SubmitBtn">Submit</button>
                    <Link to="/profile">
                        <button id="SaveBtn">Save and go back</button>
                    </Link>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
      );
  }
}

export default EditImage;

