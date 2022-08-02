import React, { useState } from "react"
import FriendsList from "./FriendsList"


function Profile({loggedInUser, userList,onToOtherProfile}) {

    const [pictureFile, setPictureFile] = useState(null)
    const [seeFriends, setSeeFriends] = useState(false)
    const [newBio, setNewBio] = useState('')


    function handlePictureFile(e) {
        setPictureFile(e.target.value)
        console.log(e.target.value)
    }

    function handleNewBio(e) {
        e.preventDefault()
        console.log(newBio)
        fetch(`/users/${loggedInUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio: newBio
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    function handleSeeFriends() {
        setSeeFriends((seeFriends) => !seeFriends)
    }

    return(
        <div>
            <img className='profile-avatar' src={loggedInUser.avatar_url}></img>
            <div>
                <div>
                    {loggedInUser.bio ? loggedInUser.bio : 
                    <form onSubmit={handleNewBio}>
                        <textarea placeholder="Share something about you!" className="new-bio" type='text' onChange={(e) => setNewBio(e.target.value)}/>
                        <p>
                            <button>Add Bio</button>
                        </p>
                    </form>}
                </div>
                <button onClick={handleSeeFriends}>See Friends of {loggedInUser.username}</button>
                {seeFriends ? <FriendsList loggedInUser={loggedInUser} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends}/> : null}
            </div>
        </div>
    )
}

export default Profile