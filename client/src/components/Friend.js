import React, { useState } from "react"

function Friend({friend,userList}) {

    const [usersFriends, setUsersFriends] = useState([])

    
    console.log(friend)
    console.log(usersFriends)
    console.log(userList)
    return (
        <div>
            <img src={friend.avatar_url}>{friend.avatar_url}</img>
            {friend.username}
            <p>{friend.bio}</p>
        </div>
    )
}

export default Friend