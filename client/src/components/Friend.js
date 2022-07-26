import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Route, Switch } from "react-router-dom"
import OtherUsersProfile from "./OtherUsersProfile"

function Friend({friend,userList,onToOtherProfile, setSeeFriends, loggedInUser, onHandleDeleteFriend, friendData}) {

    function handleFriendProfile() {
        userList.forEach((user) => {
            if (user.username === friend.username) {
                onToOtherProfile(user)
            }
        })
       setSeeFriends((seeFriends) => !seeFriends)
    }

    function handleDeleteFriend() {
        onHandleDeleteFriend(friend)
        fetch(`/users/${loggedInUser.id}/friends/${friend.id}`, {
            method: 'DELETE'
        })
    }
   console.log(friendData)
  
    return (
        <div>
            <img className="avatar" src={friend.avatar_url}></img>
            <NavLink onClick={() => handleFriendProfile(friend)} exact to='/other-user-profile' friend={friend} >{friend.username}</NavLink>
            <p>{friend.bio}</p>
            {!friendData ? <button onClick={handleDeleteFriend}>Remove Friend</button> : null }
        </div>
    )
}

export default Friend