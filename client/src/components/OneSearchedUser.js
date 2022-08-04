import React, { useState } from "react"
import { NavLink } from "react-router-dom"

function OneSearchedUser({user, loggedInUser, onToOtherProfile}) {

    const [friendAdded, setFriendAdded] = useState(false)

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


    return (
        <form>
            {loggedInUser.username == user.username ? null : 
            <div>
                <img className="avatar" src={user.avatar_url}></img>
                <NavLink onClick={() => onToOtherProfile(user)} exact to='/other-user-profile' >{user.username}</NavLink>
                <p>{user.bio}</p>
                <button onClick={handleAddFriend}>Add friend</button>              
            </div>  }    
        </form>
    )
}

export default OneSearchedUser