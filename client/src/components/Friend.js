import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Route, Switch } from "react-router-dom"
import OtherUsersProfile from "./OtherUsersProfile"

function Friend({friend,userList,onToOtherProfile}) {

    const [usersFriends, setUsersFriends] = useState([])

   
    console.log(friend)
    console.log(usersFriends)
    console.log(userList)
    return (
        <div>
            <img className="avatar" src={friend.avatar_url}></img>
            <NavLink onClick={() => onToOtherProfile(friend)} exact to='/other-user-profile' friend={friend} >{friend.username}</NavLink>
            <p>{friend.bio}</p>
        </div>
    )
}

export default Friend