import React, { useState } from "react"
import Friend from "./Friend"

function FriendsList({loggedInUser, userList}) {

    
    return (
        <div>
            {loggedInUser.friends.map((friend) => {
                return <Friend friend={friend} />
            })}
        </div>
    )
}

export default FriendsList