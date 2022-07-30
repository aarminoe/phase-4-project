import React, { useState } from "react"

import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

function LogIn({onHandleUserLogIn, userList, onHandleNewUser, setLoggedInUser}) {

    
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
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
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser,
        password: newPass,
        password_confirmation: confirmPass
      })
    })
    .then(resp => resp.json())
    .then(createdUser => {
      onHandleNewUser(createdUser)
      console.log(createdUser.errors)
      if (createdUser.errors) {
        setErrorsFound(true)
        setErrorList(createdUser.errors)
      }
    })   
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
              <p></p>
              <button>Sign up!</button>
            </form>
            <div>
              {errorsFound ? errorList.map((e) => {
                return <p className="signup-errors">{e}</p>
              }) : null}
            </div>
          </div>
          <NavLink
          onClick={() => {setSignUp(false)}}
          className='navlink'
          exact to='/'
          activeStyle={{color: 'white'}}>Back to Log in</NavLink>
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
              <input onChange={(e) => setPass(e.target.value)} type='text' />
              <p>
                <button >Log In!</button>
              </p>
              <p>
                Don't have an account?
                <p>
                  <NavLink 
                  onClick={() => {setSignUp(true)}}
                  className='navlink'
                  exact to='/signup' 
                  activeStyle={{color: 'white'}}>Sign up!</NavLink>
                </p>
              </p>
            </form>
          </div>       
        
      }
      </header>
    )
}

export default LogIn