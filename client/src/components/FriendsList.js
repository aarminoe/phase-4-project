import React, { useState } from "react"
import Friend from "./Friend"

function FriendsList({loggedInUser, userList, onToOtherProfile, clickedUserData, setSeeFriends, seeFriends}) {

    
    return (
        <div>
            {clickedUserData ?
            clickedUserData.friends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends}/>
            })
            : loggedInUser.friends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList}/>
            })}
        </div>
    )
}

export default FriendsList