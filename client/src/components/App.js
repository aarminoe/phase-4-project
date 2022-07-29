import '../App.css';
import React, { useState, useEffect } from 'react';
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
  const [userList, setUserList] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState('')

  function handleUserLogIn(user) {
    setUserLoggedIn(true)
  }

  function handleNewUser(createdUser) {
    const updatedUserList = [...userList, createdUser]
    setUserList(updatedUserList)
  }

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setLoggedInUser(user))
      }
    })
  }, [])


  useEffect(() => {
    fetch('/users')
    .then(resp => resp.json())
    .then(users => setUserList(users))
  },[])

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
              <Home userList={userList}/>
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/messages'>
              <Messages userList={userList}/>
            </Route>
            <Route exact path='/notifications'>
              <Notifications userList={userList}/>
            </Route>
            <Route exact path='/groups'>
              <Groups userList={userList}/>
            </Route>
            <Route exact path='/search'>
              <Search userList={userList}/>
            </Route>
            
          </Switch>
        </div>
      </div>  
      : 
      <div>
        <LogIn onHandleUserLogIn={handleUserLogIn} userList={userList} onHandleNewUser={handleNewUser}/>
      </div> }
    </div>
  );
}

export default App;
