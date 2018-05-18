const MovieModel = function () {
    
    //Handling cookies
    this.setUserCookie = function(userId) {
        if (userId) {
            document.cookie = "currentUser=" + userId;
        } else {
            document.cookie = "currentUser=guest";
        }
    }
    
    this.setActiveListCookie = function(listId) {
        document.cookie = "activeList=" + listId;
    }
    
    this.setListEditCookie = function(listId, listTitle, list) {
        document.cookie = "editList=" + listId + "*@*" + listTitle + "*@*" + list;
        // *@* are used to split on when we want the separate information about listId, title and list
    }
    
    this.setActiveMovieCookie = function(movieId, listId) {
        document.cookie = "activeMovie=" + movieId + "*from*" + listId;
    }
        
    this.getCookie = function(str) {
        var allCookies = document.cookie.split("; ");
        for (var i = 0; i < allCookies.length; i++) {
            var currentCookie = allCookies[i];
            if (str === "user") {
                var userString = "currentUser=";
                if (currentCookie.indexOf(userString) === 0) {
                    return currentCookie.substring(userString.length, currentCookie.length);
                }
            }
            else if (str === "list") {
                var listString = "activeList=";
                if (currentCookie.indexOf(listString) === 0) {
                    return currentCookie.substring(listString.length, currentCookie.length);
                }
            }
            else if (str === "edit") {
                var editString = "editList=";
                if (currentCookie.indexOf(editString) === 0) {
                    var cookieData = currentCookie.substring(editString.length, currentCookie.length).split('*@*');
                    var cookieObj = {};
                    cookieObj.listId = cookieData[0];
                    cookieObj.listTitle = cookieData[1];
                    cookieObj.list = cookieData[2];
                    return cookieObj;
                }
            }
            else if (str === "movie") {
                var movieString = "activeMovie=";
                if (currentCookie.indexOf(movieString) === 0) {
                    var cookieData = currentCookie.substring(movieString.length, currentCookie.length).split('*from*');
                    var cookieObj = {};
                    cookieObj.movie = cookieData[0];
                    cookieObj.fromList = cookieData[1];
                    return cookieObj;
                }
            }
        }
        return null;
    }

    this.removeCookie = function(str) {
        var allCookies = document.cookie.split("; ");

        for (var i = 0; i < allCookies.length; i++) {
            var currentCookie = allCookies[i];
            
            if (str === "user") {
                var userString = "currentUser=";
                if (currentCookie.indexOf(userString) === 0) {
                    var cookieToDelete = userString;
                    document.cookie = cookieToDelete + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    break;
                }
            }
            else if (str === "list") {
                var listString = "activeList=";
                if (currentCookie.indexOf(listString) === 0) {
                    var cookieToDelete = listString;
                    document.cookie = cookieToDelete + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    break;
                }
            }
            else if (str === "edit") {
                var editString = "editList=";
                if (currentCookie.indexOf(editString) === 0) {
                    var cookieToDelete = editString;
                    document.cookie = cookieToDelete + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    break;
                }
            }
            else if (str === "movie") {
                var movieString = "activeMovie=";
                if (currentCookie.indexOf(movieString) === 0) {
                    var cookieToDelete = movieString;
                    document.cookie = cookieToDelete + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    break;
                }
            }
        }
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