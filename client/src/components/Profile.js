import React, { useState } from "react"
import FriendsList from "./FriendsList"
import Post from "./Post"


function Profile({loggedInUser, userList,onToOtherProfile, postList, addedFriend}) {

    const [seeFriends, setSeeFriends] = useState(false)
    const [newBio, setNewBio] = useState('')

    console.log(loggedInUser)

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
                <div className="profile-bio">
                    {loggedInUser.bio ? loggedInUser.bio : null}
                </div>
                <button className="see-friends" onClick={handleSeeFriends}>See Friends of {loggedInUser.username}</button>
                {seeFriends ? <FriendsList loggedInUser={loggedInUser} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends} addedFriend={addedFriend}/> : null}
                <div>
                    <div className="posts-from">
                        {`Posts from ${loggedInUser.username}`}
                    </div>
                    <div>
                        {postList.map((post) => {
                            if (post.user.username === loggedInUser.username) {
                                return <Post post={post} loggedInUser={loggedInUser} />
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile