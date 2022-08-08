import OneSearchedUser from "./OneSearchedUser"
import React, { useState } from "react"

function SearchedUsers({user, loggedInUser, searchedUser, onToOtherProfile, onHandleAddFriend}) {


    return (
        <div>
            {user.username.toLowerCase().includes(searchedUser) ? <OneSearchedUser user={user} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onHandleAddFriend={onHandleAddFriend}/> :null}
            
        </div>
    )
}

export default SearchedUsers
