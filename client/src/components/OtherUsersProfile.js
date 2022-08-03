import React, { useState } from "react"
import FriendsList from "./FriendsList"

function OtherUsersProfile({friendData, userList, onToOtherProfile, loggedInUser}) {

    console.log(console.log(friendData))

    const [seeFriends, setSeeFriends] = useState(false)
    const [clickedUserData, setClickedUserData] = useState(null)
    const [sendingMessage, setSendingMessage] = useState(false)
    const [message, setMessage] = useState('')

    function handleOtherProfileFriends() {
        userList.forEach((user) => {
            if (user.username === friendData.username) {
                setClickedUserData(user)
            }
        })
        setSeeFriends((seeFriends) => !seeFriends)
    }

    function handleNewMessageClick() {
        setSendingMessage((sendingMessage) => !sendingMessage)
    }

    function handleNewMessageSend(e) {
        e.preventDefault()
        console.log(message)
        console.log(friendData)
        fetch(`/users/${friendData.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                who_messaged: loggedInUser.username,
                user_id: friendData.id
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            {friendData ? <img className='profile-avatar' src={friendData.avatar_url}></img> : null}
            <div>
                {friendData? friendData.username : null}
                <button className="message-icon" onClick={handleNewMessageClick}>🖂</button>
                <div>
                    {sendingMessage ?
                    <form onSubmit={handleNewMessageSend}>
                        <input type='text' onChange={(e) => setMessage(e.target.value)}></input>
                        <button>Send</button> 
                    </form> 
                    : null}
                    
                </div>
                <div>
                    {friendData ? friendData.bio : null}
                </div>
                <button onClick={handleOtherProfileFriends} >See Friends of {friendData ? friendData.username : null}</button>
                {seeFriends ? <FriendsList clickedUserData={clickedUserData} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends} /> : null}
            </div>
        </div>
    )
}

export default OtherUsersProfile