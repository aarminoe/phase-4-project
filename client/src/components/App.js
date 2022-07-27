import '../App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import NavBar from './NavBar';
import Home from './Home';
import Header from './Header';
import Profile from './Profile';
import Messages from './Messages';
import Notifications from './Notifications';
import Groups from './Groups';
import Search from './Search';



function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  function handleUserLogIn(user) {
    setUserLoggedIn(true)
  }

  return (
    <div className='App-header'>
      
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
            <Route exact path='/messages'>
              <Messages />
            </Route>
            <Route exact path='/notifications'>
              <Notifications />
            </Route>
            <Route exact path='/groups'>
              <Groups />
            </Route>
            <Route exact path='/search'>
              <Search />
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
