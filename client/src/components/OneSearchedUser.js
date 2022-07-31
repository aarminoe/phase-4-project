import React, { useState } from "react"

function OneSearchedUser({user, loggedInUser}) {

    const [friendAdded, setFriendAdded] = useState(false)
    const [userFriendsList, setUserFriendsList] = useState([])

    function goToProfile(e) {
        console.log(user)
    }

    function handleAddFriend() {
        setFriendAdded(true)

        fetch(`/users/${loggedInUser.id}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                user_id: loggedInUser.id
            }
            )
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
    console.log(loggedInUser.friends.values())
    console.log(user)
    return (
        <div onClick={goToProfile}>
            {loggedInUser.username == user.username ? null : 
            <div>
                <p>{user.username}</p>
                <button onClick={handleAddFriend}>Add friend</button>              
            </div>  }    
        </div>
    )
}

export default OneSearchedUser