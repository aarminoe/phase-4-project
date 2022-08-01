import React, { useState } from "react"

function OneSearchedUser({user, loggedInUser}) {

    const [friendAdded, setFriendAdded] = useState(false)
    const [userFriendsList, setUserFriendsList] = useState([])

    function goToProfile(e) {
        console.log(user.avatar_url)
    }

    function handleAddFriend(e) {
        e.preventDefault()
        setFriendAdded(true)
        console.log(user.avatar_url)
        fetch(`/users/${loggedInUser.id}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                avatar_url: user.avatar_url,
                bio: user.bio,
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
        <form onSubmit={goToProfile}>
            {loggedInUser.username == user.username ? null : 
            <div>
                <img className="avatar" src={user.avatar_url}></img>
                <p>{user.username}</p>
                <p>{user.bio}</p>
                <button onClick={handleAddFriend}>Add friend</button>              
            </div>  }    
        </form>
    )
}

export default OneSearchedUser