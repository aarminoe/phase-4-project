import OneSearchedUser from "./OneSearchedUser"
import React, { useState } from "react"

function SearchedUsers({user, loggedInUser, searchedUser}) {


    return (
        <div>
            {user.username.toLowerCase().includes(searchedUser) ? <OneSearchedUser user={user} loggedInUser={loggedInUser}/> :null}
            
        </div>
    )
}

export default SearchedUsers
