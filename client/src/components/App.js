import '../App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import NavBar from './NavBar';
import Home from './Home';
import Header from './Header';
import Profile from './Profile';


function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  function handleUserLogIn(user) {
    setUserLoggedIn(true)
  }

  return (
    <div>
      
      {userLoggedIn ? 
      <div>
        <header>
          <Header />
          <NavBar />
        </header>
        <div>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>  
      : 
      <div>
        <LogIn onHandleUserLogIn={handleUserLogIn} />
      </div> }
    </div>
  );
}

export default App;
