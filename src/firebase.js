import Firebase from "firebase";
import { map } from 'lodash';
import {modelInstance} from './data/MovieModel';

console.log("inne i firebase");
//var firebase = require('firebase');
//console.log(firebase);
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

export function getUserInfo() {
    var childData;
    //var userRef = Firebase.auth().currentUser;
    var userID = getUserID();
    console.log("UserID get", userID);
    var userRef = Firebase.database().ref('/users/' + userID);
    
    console.log("Userref", userRef.image);
    return userRef;
    
    //var userRef = Firebase.database().ref('users');
    //userRef.on('value', function(snapshot) {
    //    console.log("hej");
    //    snapshot.forEach(function(childSnapshot) {
    //        console.log(childSnapshot.val());
    //        var childData = childSnapshot.val();
    //        console.log(childData);
    //    });
    //});
    //console.log(childData);
    //return childData;
}

export function editProfile(newUsername, newImg) {
    console.log("currentUser", Firebase.auth().currentUser);
    var user = Firebase.auth().currentUser;
    if (user) {
        var userID = user.uid;
        Firebase.database().ref('users/' + userID).set({
            username: newUsername,
            image: newImg
        })
        console.log("User signed in:", user.uid);
    } else {
        console.log("No user signed in");
    }
}

export const toList = obj => map(obj, (value, key) => ({
  key,
  ...value
}))

export default database