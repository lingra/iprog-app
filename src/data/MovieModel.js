const MovieModel = function () {

    // Variables
    var observers = [];

    
    // API Calls
    this.getAllMovies = function (keyword) {
        const url = 'http://www.omdbapi.com/?page=1&apikey=f604b64c';

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
        var movieURL = 'http://www.omdbapi.com/?i=' + id + '&apikey=f604b64c';

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