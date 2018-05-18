import Firebase from "firebase";

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
    var user = Firebase.auth().currentUser;
    if (user) {
        var userID = user.uid;
        if (userName !== ""){
            Firebase.database().ref('users/' + userID).update({
            username: userName
        })};
        if (userGenre !== ""){
            Firebase.database().ref('users/' + userID  + '/trivia').update({
            favgenre: userGenre
        })};
        if (userLine !== ""){
            Firebase.database().ref('users/' + userID  + '/trivia').update({
            favline: userLine
            })};
        if (userMovie !== ""){
            Firebase.database().ref('users/' + userID  + '/trivia').update({
            favmovie: userMovie
        })};
        if (userActor !== ""){
            Firebase.database().ref('users/' + userID  + '/trivia').update({
            favactor: userActor
        })};
        if (userSnack !== ""){
            Firebase.database().ref('users/' + userID  + '/trivia').update({
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

//Remove when done updating components to the new ones
export const getProfile = (userId) => {
    return database.ref('users/' + userId);
}

export const getUsername = (userId) => {
    return database.ref('users/' + userId + '/username');
}

export const getProfilePic = (userId) => {
    return database.ref('users/' + userId + '/image');
}

export const getTrivia = (userId) => {
    return database.ref('users/' + userId + '/trivia');
}

export const getUserLists = (userId) => {
    var user = userId;
    return database.ref('lists/').orderByChild('author').equalTo(user);
}

export const getList = (listId) => {
    return database.ref('lists/' + listId);
}

export const getAllLists = () => {
    return database.ref('lists');
}

export const saveMovieList = (listData) => {
    // Set a unique list key
    var listRef = database.ref('lists').push().key;
    return database.ref('lists/' + listRef).set(listData);
}

export const updateMovieList = (listKey, listData) => {
    return database.ref('lists/' + listKey).update(listData);
}

export const deleteMovieList = (listKey) => {
    return database.ref('lists/' + listKey).remove();
}

export default database