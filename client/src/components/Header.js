import React, { useState } from "react"

function Header({loggedInUser}) {

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => logOut())
    }

    function logOut() {
        window.location.reload()
    }

    return(
        <div className="header">
            <header className="header-title">My Clique</header>
            <h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </h1>

        </div>
    )
}

export default Header