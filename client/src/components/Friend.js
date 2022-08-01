import React, { useState } from "react"

function Friend({friend,userList}) {

    const [usersFriends, setUsersFriends] = useState([])

    
    console.log(friend)
    console.log(usersFriends)
    console.log(userList)
    return (
        <div>
            <img className="avatar" src={friend.avatar_url}></img>
            <p>{friend.username}</p>
            <p>{friend.bio}</p>
        </div>
    )
}

export default Friend