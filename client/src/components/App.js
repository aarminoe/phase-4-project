import '../App.css';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import NavBar from './NavBar';
import Home from './Home';
import Header from './Header';
import Profile from './Profile';
import Messages from './Messages';
import Notifications from './Notifications';
import Groups from './Groups';
import Search from './Search';
import FriendsList from './FriendsList';
import OtherUsersProfile from './OtherUsersProfile';




function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userList, setUserList] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [needProfile, setNeedProfile] = useState(false)
  const [friendData, setFriendData] = useState(null)
  const [groupList, setGroupList] = useState([])

  function handleUserLogIn(user) {
    setUserLoggedIn(true)
    setLoggedInUser(user)
  }

  function handleNewUser(createdUser) {
    const updatedUserList = [...userList, createdUser]
    setUserList(updatedUserList)
  }

  function toOtherProfile(user) {
    setFriendData(user)
  }

  function handleNewPost() {

  }

  useEffect(() => {
    fetch('/me')
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

  useEffect(() => {
    fetch('/groups')
    .then(resp => resp.json())
    .then(groups => setGroupList(groups))
  },[])

  if (loggedInUser) {
    if (loggedInUser.avatar_url) {
      return (
        <div className='App-header'>
          <div>
            <header>
              <Header />
              <NavBar needProfile={needProfile} />
            </header>
            <div>
              <Switch>
                <Route exact path='/'>
                  {needProfile ? <Redirect to='/profile' /> : 
                  <Home userList={userList} loggedInUser={loggedInUser} onHandleNewPost={handleNewPost}/> }
                </Route>
                <Route exact path='/profile'>
                  <Profile loggedInUser={loggedInUser} userList={userList} onToOtherProfile={toOtherProfile}/>
                </Route>
                <Route exact path='/messages'>
                  <Messages userList={userList} loggedInUser={loggedInUser}/>
                </Route>
                <Route exact path='/notifications'>
                  <Notifications userList={userList}/>
                </Route>
                <Route exact path='/groups'>
                  <Groups userList={userList} groupList={groupList} loggedInUser={loggedInUser}/>
                </Route>
                <Route exact path='/search'>
                  <Search userList={userList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile}/>
                </Route>
                <Route exact path='/friends'>
                  <FriendsList userList={userList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile}/>
                </Route>
                <Route exact path='/other-user-profile'>
                  <OtherUsersProfile userList={userList} loggedInUser={loggedInUser} friendData={friendData} onToOtherProfile={toOtherProfile}/>
                </Route>
                
              </Switch>
            </div>
          </div>   
  
        </div>
      );


    }
    else {
      return (
        <div>
          <Profile loggedInUser ={loggedInUser}/>
        </div>
      )
    }
    
  }
  else {
      return(
    <div>
    <LogIn setNeedProfile={setNeedProfile} onHandleUserLogIn={handleUserLogIn} userList={userList} onHandleNewUser={handleNewUser} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
  </div> 
      )
  }
}

export default App;
