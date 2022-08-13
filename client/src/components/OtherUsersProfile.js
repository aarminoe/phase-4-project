import React, { useState } from "react"
import FriendsList from "./FriendsList"
import Post from "./Post"

function OtherUsersProfile({friendData, userList, onToOtherProfile, loggedInUser, onHandleNewMessageState, postList, onHandleNewMessageInConversation, hasConversationWith}) {

   console.log(friendData)

    const [seeFriends, setSeeFriends] = useState(false)
    const [clickedUserData, setClickedUserData] = useState(null)
    const [sendingMessage, setSendingMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [conversationId, setConversationId] = useState(null)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)
   

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
        console.log(friendData)
        console.log(loggedInUser.conversations)
        loggedInUser.conversations.forEach((conversation) => {
            if (conversation.conversation_with === friendData.username) {
                console.log('we have a conversation')
                fetch(`/users/${friendData.id}/conversations/${conversation.id}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        who_messaged: loggedInUser.username,
                        conversation_id: conversation.id
                    })
                })
                .then(resp => resp.json())
                .then(data => onHandleNewMessageInConversation(data))
            }
            return
        })

        if (hasConversationWith !== friendData) {
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

                console.log('oh no!')
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
        .then(data => {
            onHandleNewMessageState(data)
            setMessage('')
        })
        
    }

    return (
        <div>
            <p className="messages-header">
                {friendData.username}
            </p>
            {friendData ? <img className='profile-avatar' src={friendData.avatar_url}></img> : null}
            <div>
                <div className="other-users-data">
                    {friendData? friendData.username : null}
                    <button className="message-icon" onClick={handleNewMessageClick}>🖂</button>
                    <div>
                        {sendingMessage ?
                        <form onSubmit={handleNewMessageSend}>
                            <input value={message} type='text' onChange={(e) => setMessage(e.target.value)}></input>
                            <button>Send</button> 
                        </form> 
                        : null}                   
                    </div>
                    <div className="profile-bio">
                        {friendData ? friendData.bio : null}
                    </div>
                </div>
                <button className="see-friends" onClick={handleOtherProfileFriends} >See Friends of {friendData ? friendData.username : null}</button>
                {seeFriends ? <FriendsList  clickedUserData={clickedUserData} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends} loggedInUser={loggedInUser}/> : null}
                <div className="posts-from">
                    {friendData ? `Posts from ${friendData.username}` : null}
                    <div>
                        {friendData ? postList.map((post) => {
                            if (post.user.username === friendData.username) {
                                return <Post post={post} loggedInUser={loggedInUser} />
                            }
                        }): null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherUsersProfile