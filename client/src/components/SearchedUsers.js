import OneSearchedUser from "./OneSearchedUser"
import React, { useState } from "react"

function SearchedUsers({user, loggedInUser, searchedUser, onToOtherProfile, onHandleAddFriend, newFriend}) {


    return (
        <div>
            {user.username.toLowerCase().includes(searchedUser) ? <OneSearchedUser user={user} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onHandleAddFriend={onHandleAddFriend} newFriend={newFriend}/> :null}
            
        </div>
    )
}

export default SearchedUsers
