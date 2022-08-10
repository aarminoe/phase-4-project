import React, { useState } from "react"
import Friend from "./Friend"

function FriendsList({loggedInUser, userList, onToOtherProfile, clickedUserData, setSeeFriends, seeFriends, addedFriend}) {

    const [loggedInUserFriends, setLoggedInUserFriends] = useState(loggedInUser.friends)
    
    function handleDeleteFriend(deletedFriend) {
        const updatedFriendList = loggedInUserFriends.filter((friend) => {
            return friend !== deletedFriend
        })
        setLoggedInUserFriends(updatedFriendList)
    }
    console.log(addedFriend)

    return (
        <div>
            {clickedUserData ?
            clickedUserData.friends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend}/>
            })
            :  null }
            {addedFriend[0] ? addedFriend.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend}/>
            }) : loggedInUserFriends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend}/>
            })}
            
        </div>
    )
}

export default FriendsList