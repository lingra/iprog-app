# M(yFave)Db

## Short description
The application handles users and their favorite movies lists. As a user you can sign up for the application, edit your profile page, create your own favorite movies lists (such as "My Top 10 Horror Movies", "Best five movies with Tom Hanks" etc.) with the help of The Open Movie Database and view the lists of other users. 

## Disclaimer
We have spent hours and hours (perhaps way too many) on this project, and would not have been able to get by without a lot of wry humor. This means that usernames, images and lists of already existing users are, well, a bit ridiculous (to say the least!). We suggest that you view the content of the application with a pinch of salt!

## What you can do
### Sign up and log in
From the start page you can create a new account, or login to an existing one. You can also continue and browse lists as a guest visitor.

### View the lists from all users
On the main page you can see all lists available at M(yFave)Db. By clicking a list you can view it in its entirety (see the author and his or hers fancy profile image and the all movies in the list).

### View specific movies
Navigating from the fullscreen view of a list, you can also click on each poster in a list to learn more about the movie (when it premiered, plot, actors and so on).

### Edit your profile
By clicking on your profile name on the home/mainpage, you can go to a full view of your profile. There you can edit your profile name or user information (such as username and trivia). The profile page also displays your lists in more detail than in the profile sidebar of the main page. NOTE: we do not store profile images in their true file format on Firebase. It only supports adding an image URL.

### View your lists
By clicking on one of your lists names in your profile bar, or the list image on the full profile page, you can view your list in its entirety. Here you also have the option to edit your list or perhaps remove it.

### Create a new list
Clicking on Add list in the profile bar or in the full profile page will give you the option to create a new list. Here you can search for a movie you want to add to your list (using The Open Movie Database API). A new search starts with the press of the enter key. Movies are added to your list by the use of drag and drop.

## When testing
If you would like to test the application without signing up, you are welcome to use the login information of our test user. Please use e-mail: emmake@kth.se, and password: hej1234hej

NOTE: When navigating you can keep a look out for small glowing icons (arrows, home page house etc). These will usually guide you back.

## Design & Layout
We have made a colorful design that we've tried to make consistent on all pages. 

## What we've used
The project is using React, and user information is stored using Firebase. We also persist data from the movie lists in Firebase. Only the title, author and ids of the included lists are stored. All other information about the movies are fetched from the API (due to copyright restrictions).

## Missing functionality and changes from the original project plan
In the beginning our plan was to use the API of TMDb (The Movie Database). Receiving an API key however required an extensive application form, which we did not know the response time on. Instead we decided to use OMDb (The Open Movie Database), which still gave us the information we wanted.

We planned to make it possible to visit other users profile page, but where not able to finish this in time for the deadline. 

Some CSS styling errors we have not had the time to fix.

## Project file structure

/public/
* index.html

/src/
* app.js 
    * for routing
* auth.js
    * handling Firebase authentication
* firebase.js
    * handling Firebase database references
* index.js
    * main component
    
Components in /src/:
* Start
    * start page
* Login
    * login page
* SignUp
    * sign up page
* MainPage
    * home/main page
    * parent component of ProfileBar and AllLists
* ProfileBar
    * profile sidebar on main page
* AllLists
    * display all user movie lists available
* ProfilePage
    * profile page
* EditImage
    * edit profile image page
* EditProfile
    * edit profile information page   
* CreateList 
    * create list page
    * parent component of NewList and Movies
* NewList
    * handles create/edit list with drag drop functionality
* Movies
    * displays API searchresult
* FullScreenList
    * page for display content of a list
* MovieInfo
    * page for displaying info about a specific movie
    
/src/images
* Images used as backgrounds in the application

/src/html skeletons
* HTML mockups of pages before the creation of React components. Perhaps not of interest to review.

```
Icons: glyphicons.com