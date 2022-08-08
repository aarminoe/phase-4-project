import React, { useState } from "react"

function Header() {

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
    }

    return(
        <div>
            <header>Header</header>
            <h1>
                <button onClick={handleLogout}>Logout</button>
            </h1>

        </div>
    )
}

export default Header