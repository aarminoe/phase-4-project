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
        avatar_url: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=',
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
    <header>
        <p>
          Welcome to Title!
        </p>
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
          className='navlink'
          exact to='/'
          activeStyle={{color: 'white'}}>Back to Log in</Link>
        </div> 
        :
          <div>
            <form onSubmit={handleSubmit}>
              <p>
                Log In
              </p>
              <p>
                User:
              </p>
                <input onChange={(e) => setUser(e.target.value)} type='text' />
              <p>
                Pass:
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
                  className='navlink'
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