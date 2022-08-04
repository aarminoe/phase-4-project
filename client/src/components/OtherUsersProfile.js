import React, { useState } from "react"
import FriendsList from "./FriendsList"

function OtherUsersProfile({friendData, userList, onToOtherProfile, loggedInUser, onHandleSendingMessage}) {

    console.log(console.log(friendData))

    const [seeFriends, setSeeFriends] = useState(false)
    const [clickedUserData, setClickedUserData] = useState(null)
    const [sendingMessage, setSendingMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [hasConversationWith, setHasConversationWith] = useState(false)
    const [conversationId, setConversationId] = useState(null)
   

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
        friendData.conversations.forEach((conversation) => {
            if (conversation.conversation_with === loggedInUser.username) {
                setHasConversationWith(true)
                setConversationId(conversation.id)
            }
        })
        if (hasConversationWith) {
            fetch(`/users/${friendData.id}/conversations/${conversationId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    who_messaged: loggedInUser.username,
                    conversation_id: conversationId
                })
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
        }
        else {
            fetch(`/users/${friendData.id}/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversation_with: loggedInUser.username,
                    user_id: friendData.id
                })
            })
            .then(resp => resp.json())
            .then(data => {
                handleConversationMessage(data)
                setHasConversationWith(true)
            })
            fetch(`/users/${loggedInUser.id}/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversation_with: friendData.username,
                    user_id: loggedInUser.id
                })
            })
            .then(resp => resp.json())
            .then(data => {
                handleConversationMessage(data)
                setHasConversationWith(true)
            })        
        }
    }

    function handleConversationMessage(data) {
        fetch(`/users/${friendData.id}/conversations/${data.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                who_messaged: loggedInUser.username,
                conversation_id: data.id
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