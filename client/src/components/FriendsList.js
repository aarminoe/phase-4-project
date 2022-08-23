import React, { useState } from "react"
import Friend from "./Friend"

function FriendsList({loggedInUser, userList, onToOtherProfile, clickedUserData, setSeeFriends, seeFriends, addedFriend, friendData}) {

    const [loggedInUserFriends, setLoggedInUserFriends] = useState(loggedInUser.friends)
    
    function handleDeleteFriend(deletedFriend) {
        const updatedFriendList = loggedInUserFriends.filter((friend) => {
            return friend !== deletedFriend
        })
        setLoggedInUserFriends(updatedFriendList)
    }
    console.log(addedFriend)
    console.log(clickedUserData)
    console.log(friendData)
    return (
        <div>
            {clickedUserData ?
            clickedUserData.friends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend} friendData={friendData}/>
            })
            :  null }
            {addedFriend && !clickedUserData ? addedFriend.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend} />
            }) : null} 
            {!clickedUserData && !addedFriend[0] ? loggedInUserFriends.map((friend) => {
                return <Friend friend={friend} onToOtherProfile={onToOtherProfile} userList={userList} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser} onHandleDeleteFriend={handleDeleteFriend} />
            }):null}
            
        </div>
    )
}

export default FriendsList