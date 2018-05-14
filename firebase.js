import Firebase from "firebase";
import { map } from 'lodash';
import {modelInstance} from './data/MovieModel';

//Init
var config = {
    apiKey: "AIzaSyDZ-3B51anSKg6QcWddRA8dYlXHmcK0Uoo",
    authDomain: "iprog-myfavedb.firebaseapp.com",
    databaseURL: "https://iprog-myfavedb.firebaseio.com",
    projectId: "iprog-myfavedb",
    storageBucket: "iprog-myfavedb.appspot.com",
    messagingSenderId: "688175599939"
};

Firebase.initializeApp(config)

export const database = Firebase.database()
export const authentication = Firebase.auth();

// Methods
export function signUp(email, password) {
    Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

export function signIn(email, password) {
    Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error:", error.code);
    });
    console.log("Inloggad");
}

export function signOut() {
    Firebase.auth().signOut().then(function() {
        //If succesful redirect to start
        // Sign-out successful.
        console.log("Sign out succesfull!")
    }).catch(function(error) {
        console.log("Something went wrong with sign out")
        //Print error to console? Or alert?
        // An error happened.
    });
}


//NOT USED
export function getUserID() {
    Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            modelInstance.userID = user.uid;
            console.log("inloggad som", modelInstance.userID);
        }
        else {
            modelInstance.userID = null;
        }
    });
    return modelInstance.userID;
}

export function editProfilePic(userPic) {
    var user = Firebase.auth().currentUser;
    if (user) {
        var userID = user.uid;
        Firebase.database().ref('users/' + userID).set({
            image: userPic
        })
        console.log("User signed in:", user.uid);
    } else {
        console.log("No user signed in");
    }
}

export function editProfile(userName, userGenre, userLine, userMovie, userActor, userSnack) {
    console.log("currentUser", authentication.currentUser);
    var user = Firebase.auth().currentUser;
    if (user) {
        var userID = user.uid;
        Firebase.database().ref('users/' + userID).update({
            username: userName,
            favgenre: userGenre,
            favline: userLine,
            favmovie: userMovie,
            favactor: userActor,
            favsnack: userSnack
        })
        console.log("User signed in:", user.uid);
    } else {
        console.log("No user signed in");
    }
}

export const setupUser = (userId) => {
    var defaultData = {
        username: 'Set a username',
        image: 'Unknown'
    };
    return database.ref('users/' + userId).set(defaultData);
}

export const saveMovieList = (listData) => {
    // Set a unique list key
    var listRef = database.ref('lists').push().key;
    return database.ref('lists/' + listRef).set(listData);
}

export default database