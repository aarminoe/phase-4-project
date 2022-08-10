import React, { useState } from "react"
import { NavLink } from "react-router-dom"

function OneSearchedUser({user, loggedInUser, onToOtherProfile, onHandleAddFriend}) {

    const [friendAdded, setFriendAdded] = useState(false)

    function handleAddFriend(e) {
        e.preventDefault()
        let areFriends = false
        setFriendAdded(true)
        for (let i=0;i<loggedInUser.friends.length; i++) {
            if (loggedInUser.friends[i].username === user.username) {
                console.log('we are friends')
                areFriends = true
            }
        }
        if (areFriends === false) {
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
                onHandleAddFriend(data)
            })
        }
    }


    return (
        <form>
            {loggedInUser.username == user.username ? null : 
            <div>
                <img className="avatar" src={user.avatar_url}></img>
                <NavLink onClick={() => onToOtherProfile(user)} exact to='/other-user-profile' >{user.username}</NavLink>
                <p>{user.bio}</p>
                <button onClick={handleAddFriend}>Add friend</button> 
                {friendAdded ? 'Friend Added!' : null}           
            </div>  }    
        </form>
    )
}

export default OneSearchedUser