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

export function editProfilePic(userPic) {
    var user = Firebase.auth().currentUser;
    if (user) {
        var userID = user.uid;
        Firebase.database().ref('users/' + userID).update({
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
        if (userName !== ""){
            Firebase.database().ref('users' + userID).update({
            username: userName
        })};
        if (userGenre !== ""){
            Firebase.database().ref('users' + userID).update({
            favgenre: userGenre
        })};
        if (userLine !== ""){
            Firebase.database().ref('users' + userID).update({
            favline: userLine
            })};
        if (userMovie !== ""){
            Firebase.database().ref('users' + userID).update({
            favmovie: userMovie
        })};
        if (userActor !== ""){
            Firebase.database().ref('users' + userID).update({
            favactor: userActor
        })};
        if (userSnack !== ""){
            Firebase.database().ref('users' + userID).update({
            favsnack: userSnack
        })};
        console.log("User changed data!");
    } else {
        console.log("No data changed");
    }
}

export const setupUser = (usernm, userId) => {
    var defaultData = {
        username: usernm,
        image: 'Unknown'
    };
    return database.ref('users/' + userId).set(defaultData);
}

export const getProfile = (userId) => {
    return database.ref('users/' + userId);
}

export const getUserLists = (userId) => {
    var user = userId;
    return database.ref('lists/').orderByChild('author').equalTo(user);
}

export const saveMovieList = (listData) => {
    // Set a unique list key
    var listRef = database.ref('lists').push().key;
    return database.ref('lists/' + listRef).set(listData);
}

export default database