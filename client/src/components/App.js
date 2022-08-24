import '../App.css';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import NavBar from './NavBar';
import Home from './Home';
import Header from './Header';
import Profile from './Profile';
import GroupPage from './GroupPage';
import Groups from './Groups';
import Search from './Search';
import FriendsList from './FriendsList';
import OtherUsersProfile from './OtherUsersProfile';
import Conversation from './Conversation';





function App() {

  const [userList, setUserList] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [friendData, setFriendData] = useState(null)
  const [groupList, setGroupList] = useState([])
  const [postList, setPostList] = useState([])
  const [newMessageNewConversation, setNewMessageNewConversation] = useState(null)
  const [newMessageHasConversation, setNewMessageHasConversation] = useState(null)
  const [hasConversationWith, setHasConversationWith] = useState(null)
  const [addedFriend, setAddedFriend] = useState([])
  const [newFriend, setNewFriend] = useState(null)
  

  function handleUserLogIn(user) {
    setLoggedInUser(user)
  }

  function handleNewUser(createdUser) {
    const updatedUserList = [...userList, createdUser]
    setUserList(updatedUserList)
  }

  function toOtherProfile(user) {
    setFriendData(user)
    loggedInUser.conversations.forEach((conversation) => {
      console.log(conversation)
      if (conversation.conversation_with === user.username) {
        console.log(user.username)
        setHasConversationWith(user)
      }
    })
  }

  function handleNewPost(newPost) {
    const updatedPostList = [...postList.reverse(), newPost]
    setPostList(updatedPostList.reverse())
  }

  function handleDeletePost(deletedPost) {
    const updatedPostList = postList.filter((post) => {
      return post !== deletedPost
    })
    setPostList(updatedPostList)
  }

  function handleAddFriend(newFriendAdded) {
    const updatedFriendList = [...loggedInUser.friends, newFriendAdded]
    setAddedFriend(updatedFriendList)
    setNewFriend(newFriendAdded)
  }


  function handleNewMessageInConversation(newMessage) {
    console.log(newMessage)
    setNewMessageHasConversation(newMessage)
    console.log(loggedInUser)
  }

  function handleEditPostState(edittedPost) {
    const updatedPost = postList.map((post) => {
      if (post.id === edittedPost.id) {
        return {
          ...post,
          post: edittedPost.post
        }
      } else {
        return post
      }
    })
    setPostList(updatedPost)
  }

  function handleNewGroup (newGroup) {
    console.log(newGroup)
    const updatedGroupList = [...groupList.reverse(), newGroup]
    setGroupList(updatedGroupList.reverse())
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
    .then(groups => setGroupList(groups.reverse()))
  },[])

  useEffect(() => {
    fetch('/posts')
    .then(resp => resp.json())
    .then(posts => setPostList(posts.reverse()))
  },[])

  console.log(loggedInUser)
  if (loggedInUser) {
    if (loggedInUser.avatar_url) {
      return (
        <div >
          <div>
            <header className='head'>
              <Header loggedInUser={loggedInUser}/>
              <NavBar loggedInUser={loggedInUser}/>
            </header>
            <div className='App-header'>
              <Switch>
                <Route exact path='/'>  
                  <Home userList={userList} loggedInUser={loggedInUser} onHandleNewPost={handleNewPost} postList={postList} onHandleEditPost={handleEditPostState} onHandleDeletePost={handleDeletePost}/> 
                </Route>
                <Route exact path='/profile'>
                  <Profile loggedInUser={loggedInUser} userList={userList} onToOtherProfile={toOtherProfile} postList={postList} addedFriend={addedFriend} onHandleEditPost={handleEditPostState} onHandleDeletePost={handleDeletePost}/>
                </Route>
                <Route exact path='/messages'>
                  <Conversation userList={userList} loggedInUser={loggedInUser} newMessageNewConversation={newMessageNewConversation} newMessageHasConversation={newMessageHasConversation}/>
                </Route>
                <Route exact path='/groups'>
                  <Groups userList={userList} groupList={groupList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile} onHandleNewGroup={handleNewGroup}/>
                </Route>
                <Route exact path='/search'>
                  <Search userList={userList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile} onHandleAddFriend={handleAddFriend} newFriend={newFriend} addedFriend={addedFriend}/>
                </Route>
                <Route exact path='/friends'>
                  <FriendsList userList={userList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile}/>
                </Route>
                <Route exact path='/other-user-profile'>
                  <OtherUsersProfile userList={userList} loggedInUser={loggedInUser} friendData={friendData} onToOtherProfile={toOtherProfile} postList={postList} onHandleNewMessageInConversation={handleNewMessageInConversation} hasConversationWith={hasConversationWith} onHandleAddFriend={handleAddFriend} addedFriend={addedFriend} />
                </Route>
                <Route exact path='/group-page'>
                  <GroupPage userList={userList} loggedInUser={loggedInUser} onToOtherProfile={toOtherProfile}  />
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
    <LogIn onHandleUserLogIn={handleUserLogIn} userList={userList} onHandleNewUser={handleNewUser} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
  </div> 
      )
  }
}

export default App;
