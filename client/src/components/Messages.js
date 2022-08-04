import Message from "./Message"
import React, { useState } from "react"

function Messages({loggedInUser, conversation, userList}) {

    console.log(conversation)

    const [replyMessage, setReplyMessage] = useState('')
    const [userToReplyTo, setUserToReplyTo] = useState(null)



    function handleReplyMessage(e) {
        setReplyMessage(e.target.value)
        userList.forEach((user) => {
            if (user.username === conversation.conversation_with) {
                setUserToReplyTo(user)
            }
        })
    }

    function handleReplyMessageSend(e) {
        e.preventDefault()
        console.log(conversation.id)
    
        console.log(replyMessage)

        console.log(userToReplyTo)
        fetch(`/users/${userToReplyTo.id}/conversations/${conversation.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: replyMessage,
                who_messaged: loggedInUser.username,
                conversation_id: conversation.id
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return(
        <div>
            {conversation.messages.map((message) => {
                return <Message message={message} loggedInUser={loggedInUser} userList={userList} conversation={conversation}/>
            })}
            <form onSubmit={handleReplyMessageSend}>
                <input type='text' placeholder='Reply...' onChange={handleReplyMessage}></input>
                <button>send</button>
            </form>
        </div>
    )
}

export default Messages