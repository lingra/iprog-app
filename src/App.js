import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/MovieModel';
import Start from './Start/Start';
import SignUp from './SignUp/SignUp';
import Login from './LogIn/Login';
import Main from './Main/Main';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'My(fav)db'
    }
  }

  render() {
      return (
          <div className="App">
            {/* We rended diffrent component based on the path */}
          
            {/* All adresses i.e. URL and loading of pages*/}
            <Route exact path="/" component={Start}/>
          
            <Route path="/Signup" render={() => <SignUp model={modelInstance}/>}/>
            <Route path="/Login" render={() => <Login model={modelInstance}/>}/>
            <Route path="/Main" render={() => <Main model={modelInstance}/>}/>
                
        </div>
    );
  }
}

export default App;
