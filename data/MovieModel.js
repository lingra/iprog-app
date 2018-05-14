const MovieModel = function () {

    // Variables
    var observers = [];
    var userID = "";

    
    // API Calls
    this.getAllMovies = function (keyword) {
        const url = 'https://www.omdbapi.com/?page=1&apikey=f604b64c';

        var searchword = "";
        if (keyword != null || keyword === "") {
            searchword = "&s=" + keyword;
        }
        
        var searchUrl = url + searchword;
        console.log(searchUrl);

        return fetch(searchUrl)
            .then(processResponse)
            .catch(handleError)
    }

    this.getMovie = function (id) {
        // Get the right URL form API
        var movieURL = 'https://www.omdbapi.com/?i=' + id + '&apikey=f604b64c';

        return fetch(movieURL)
            .then(processResponse)
            .catch(handleError)
    }

    
    // API Helper methods
    const processResponse = function (response) {
        if (response.ok) {
            return response.json()
        }
        throw response;
    }
    
    const handleError = function (error) {
        if (error.json) {
            error.json().then(error => {
                console.error('getAllMovies() API Error:', error.message || error)
            })
        } else {
            console.error('getAllMovies() API Error:', error.message || error)
        }
    }
    
    
    // Observer pattern
    this.addObserver = function (observer) {
        observers.push(observer);
    };
    
    this.removeObserver = function (observer) {
        observers = observers.filter(o => o !== observer);
    };
    
    const notifyObservers = function () {
        observers.forEach(o => o.update());
    };
        
    //Firebase
    /*
    var firebase = require('firebase');
    
        //Init
    var config = {
        apiKey: "AIzaSyDZ-3B51anSKg6QcWddRA8dYlXHmcK0Uoo",
        authDomain: "iprog-myfavedb.firebaseapp.com",
        databaseURL: "https://iprog-myfavedb.firebaseio.com",
        projectId: "iprog-myfavedb",
        storageBucket: "iprog-myfavedb.appspot.com",
        messagingSenderId: "688175599939"
    };
    firebase.initializeApp(config);
    
    this.signUp = function(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    
    this.signOut = function() {
        firebase.auth().signOut().then(function() {
            //If succesful redirect to start
            // Sign-out successful.
            console.log("Sign out succesfull")
        }).catch(function(error) {
            console.log("Something went wrong with sign out")
            //Print error to console? Or alert?
            // An error happened.
        });
    }
    
    this.getUserID = function() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userID = user.uid;
                console.log("inloggad", this.userID);
            }
            else {
                console.log("no user signed in");
                this.userID = null;
                console.log("ej", this.userID);
            }
        });
        console.log("efterloop", this.userID);
        return this.userID;
        
    }
    
    this.getUserInfo = function() {
        var childData;
        var userRef = firebase.database().ref('users');
        userRef.on('value', function(snapshot) {
            console.log("hej");
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.val());
                var childData = childSnapshot.val();
                console.log(childData);
            });
        });
        console.log(childData);
        return childData;
    }*/

};

export const modelInstance = new MovieModel();