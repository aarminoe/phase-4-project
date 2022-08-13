import React, { useState } from "react"

import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "./Profile";
import { Link } from "react-router-dom";

function LogIn({onHandleUserLogIn, setNeedProfile, onHandleNewUser, setLoggedInUser, loggedInUser}) {

    
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [newBio, setNewBio] = useState('')
  const [newAvatarUrl, setNewAvatarUrl] = useState('')
  const [logInError, setLogInError] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [errorsFound, setErrorsFound] = useState(false)
  const [errorList, setErrorList] = useState([])
  
  


  function handleSubmit(e) {
    e.preventDefault()
    onHandleUserLogIn()
    fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setLoggedInUser(data))
      } else {
        r.json().then((err) => console.log(err.errors))
      }
    })
  }

  function handleNewUserSubmit(e) {
    e.preventDefault()
    
    toCreateProfile()
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser,
        password: newPass,
        password_confirmation: confirmPass,
        avatar_url: newAvatarUrl,
        bio: newBio
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((createdUser) => { 
          onHandleNewUser(createdUser)
          setLoggedInUser(createdUser)
          setNeedProfile(true)
          console.log(createdUser.errors)})
          setSignUp(false)
      } else {
        r.json().then((err) => {
          setErrorList(err.errors)
          setErrorsFound(true)
        })
      }
    })
  }

  function toCreateProfile() {
    return <Redirect to='/profile' />
  }

  function handleLogInError() {
    if (!loggedInUser) {
      setLogInError(true)
    }
  }

 

    return (
    <header className="login-screen">
        {signUp ? 
        <div>
          <div>
            <form onSubmit={handleNewUserSubmit}>
              <p>Username:</p>
              <input type='text' onChange={(e) => setNewUser(e.target.value)}></input>              
              <p>Password:</p>
              <input type='password' onChange={(e) => setNewPass(e.target.value)}></input> 
              <p>Confirm Password:</p>
              <input type='password' onChange={(e) => setConfirmPass(e.target.value)}></input>
              <p>Add a Profile URL:</p>
              <input type='text' onChange={(e) => setNewAvatarUrl(e.target.value)}></input>
              <p>
                Tell us something about you!
              </p>
              <textarea className="new-bio" onChange={(e) => setNewBio(e.target.value)} type='text' />
              
              <p>
                <button>Sign up!</button>
              </p>
            </form>
            <div>
              {errorsFound ? errorList.map((e) => {
                return <p className="signup-errors">{e}</p>
              }) : null}
            </div>
          </div>
          <Link
          onClick={() => {setSignUp(false)}}
          exact to='/'
          activeStyle={{color: 'white'}}>Back to Log in</Link>
        </div> 
        :
          <div>
            <form onSubmit={handleSubmit}>
              <p className="login-text">
                Log In
              </p>
              <p>
                Username:
              </p>
                <input onChange={(e) => setUser(e.target.value)} type='text' />
              <p>
                Password:
              </p>
              <input onChange={(e) => setPass(e.target.value)} type='password' /> 
              <p>
                <button onClick={handleLogInError}>Log In!</button>
              </p>
              {logInError ? <p>Username/Password not found.</p> : null}
              <p>
                Don't have an account?
                <p>
                  <Link 
                  onClick={() => {setSignUp(true)}}
                  exact to='/' 
                  activeStyle={{color: 'white'}}>Sign up!</Link>
                </p>
              </p>
            </form>
          </div>       
        
      }
      </header>
    )
}

export default LogIn