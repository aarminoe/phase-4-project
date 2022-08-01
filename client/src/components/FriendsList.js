import React, { useState } from "react"
import Friend from "./Friend"

function FriendsList({loggedInUser, userList, onToOtherProfile}) {

    
    return (
        <div>
            {loggedInUser.friends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile}/>
            })}
        </div>
    )
}

export default FriendsList