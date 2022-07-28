import React, { useState } from "react"

import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

function LogIn({onHandleUserLogIn, userList, onHandleNewUser}) {

    
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [sameNameError, setSameNameError] = useState(false)
  const [passLengthError, setPassLengthError] = useState(false)
  const [errorsFound, setErrorsFound] = useState(false)
  const [errorList, setErrorList] = useState([])
  


  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    console.log(pass)
    onHandleUserLogIn(user)
  }

  function handleNewUserSubmit(e) {
    e.preventDefault()
    console.log(newUser)
    console.log(newPass)
    console.log(confirmPass)
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUser,
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

  function handleErrors() {
    userList.forEach(user => {
      if (newUser === user.name) {
        setSameNameError(true)
      }
      else {
        setSameNameError(false)
      }
    })
    if (newPass.length < 8 || newPass.length > 24) {
      setPassLengthError(true)
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
              <p></p>
              <button onClick={handleErrors}>Sign up!</button>
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
            <form>
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
                <button onClick={handleSubmit}>Log In!</button>
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