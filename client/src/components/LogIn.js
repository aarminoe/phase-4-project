import React, { useState } from "react"

function LogIn({onHandleUserLogIn}) {

    
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    console.log(pass)
    console.log(confirmPass)
    onHandleUserLogIn(user)
  }

    return (
    <header>
        <p>
          Title
        </p>
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
              Confirm Pass:
            </p>
            <input onChange={(e) => setConfirmPass(e.target.value)} type='text' />
            <p>
              <button onClick={handleSubmit}>Log In!</button>
            </p>
          </form>
        </div>       
      </header>
    )
}

export default LogIn