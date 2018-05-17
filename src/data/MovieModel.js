const MovieModel = function () {
    this.setCookie = function (userId) {
        if (userId) {
            document.cookie = "currentUser=" + userId;
        }
        else {
            document.cookie = "currentUser=guest";
        }
    console.log("Current cookies: ", document.cookie);
    }

    this.getCookie = function() {
        var allCookies = document.cookie.split("; ");
        for (var i = 0; i < allCookies.length; i++) {
            var currentCookie = allCookies[i];

            var userString = "currentUser=";
            if (currentCookie.indexOf(userString) === 0) {
                return currentCookie.substring(userString.length, currentCookie.length);
            }
        }
        return null;
    }

    this.removeCookie = function() {
        var allCookies = document.cookie.split("; ");

        for (var i = 0; i < allCookies.length; i++) {
            var currentCookie = allCookies[i];
            var userString = "currentUser=";

            if (currentCookie.indexOf(userString) === 0) {
                var cookieToDelete = userString;
                document.cookie = cookieToDelete + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                break;
            }
        }
        console.log("Current cookies: ", document.cookie);
    }

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
        


};

export const modelInstance = new MovieModel();