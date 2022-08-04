import Message from "./Message"
import React, { useState } from "react"

function Messages({loggedInUser, conversation, userList}) {

    console.log(conversation)

    const [replyMessage, setReplyMessage] = useState('')
    const [userToReplyTo, setUserToReplyTo] = useState(null)
    const [sentConversationData, setSentConversationData] = useState(null)



    function handleReplyMessage(e) {
        setReplyMessage(e.target.value)
        console.log(conversation)
        userList.forEach((user) => {
            console.log('here')
            if (user.username === conversation.conversation_with) {
                setUserToReplyTo(user)
                user.conversations.forEach((conversation) => {
                    if (conversation.conversation_with === loggedInUser.username) {
                        setSentConversationData(conversation.id)
                    }
                })
            }
        })
    }



    function handleReplyMessageSend(e) {
        e.preventDefault()

        
        fetch(`/users/${userToReplyTo.id}/conversations/${sentConversationData}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: replyMessage,
                who_messaged: loggedInUser.username,
                conversation_id: sentConversationData
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
            {conversation.messages[0] ? 
            <form onSubmit={handleReplyMessageSend}>
                <input type='text' placeholder='Reply...' onChange={handleReplyMessage}></input>
                <button>send</button>
            </form> : null}
        </div>
    )
}

export default Messages